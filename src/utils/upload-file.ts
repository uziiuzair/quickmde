import * as tus from "tus-js-client"

import { generateRandomString } from "@/utils/generate-random-strings"
import { createClient } from "@/utils/supabase/client"

export const uploadFile = async (
  file: File,
  folderPath: string = ""
): Promise<string> => {
  const supabase = createClient()

  const { data: session } = await supabase.auth.getSession()

  const fileName = generateRandomString(35)
  const objectName = folderPath ? `${folderPath}/${fileName}` : fileName

  return new Promise((resolve, reject) => {
    var upload = new tus.Upload(file, {
      endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      headers: {
        Authorization: `Bearer ${session?.session?.access_token}`,
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        bucketName: "media",
        objectName: objectName,
        contentType: file.type,
      },
      chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
      onError: function (error) {
        const errorEvent = new CustomEvent("uploadError", { detail: error })
        window.dispatchEvent(errorEvent)

        reject(error)
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)

        const progressEvent = new CustomEvent("uploadProgress", {
          detail: { bytesUploaded, bytesTotal, percentage },
        })
        window.dispatchEvent(progressEvent)
      },
      onSuccess: function () {
        const successEvent = new CustomEvent("uploadSuccess", {
          detail: `Success`,
        })
        window.dispatchEvent(successEvent)

        resolve(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/media/${objectName}`
        )
      },
    })

    return upload.findPreviousUploads().then(function (previousUploads) {
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }

      upload.start()
    })
  })
}

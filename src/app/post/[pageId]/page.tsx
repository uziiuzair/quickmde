"use client"

import { useCallback, useEffect, useState } from "react"
import Markdown from "react-markdown"

import _ from "lodash"
import Link from "next/link"
import remarkGfm from "remark-gfm"

import { LoadingIcon } from "@/components/loading-icon"
import { PostProvider, usePostContext } from "@/providers/post-provider"

export default function Page({
  params,
}: {
  params: {
    pageId: string
  }
}) {
  return (
    <PostProvider postId={params.pageId}>
      <PostContent />
    </PostProvider>
  )
}

const PostContent = () => {
  const [loading, setLoading] = useState(false)
  const [markdown, setMarkdown] = useState("# Hello, world!")

  const {
    post,
    postIsLoading,
    updatePost,
    postMutate: mutate,
  } = usePostContext()

  const debouncedUpdate = useCallback(
    _.debounce(() => {
      setLoading(true)

      if (markdown != "# Hello, world!") {
        updatePost(markdown)
          .then(() => {
            mutate()
          })
          .finally(() => {
            setTimeout(() => {
              setLoading(false)
            }, 1000)
          })
      } else {
        setLoading(false)
      }
    }, 1000),
    [markdown, updatePost, mutate] // All dependencies must be correctly passed here
  )

  useEffect(() => {
    if (!postIsLoading && post?.markdown) {
      setMarkdown(post.markdown)
    }
  }, [post, postIsLoading])

  useEffect(() => {
    if (markdown) {
      debouncedUpdate()
    }

    return () => {
      debouncedUpdate.cancel()
    }
  }, [markdown, debouncedUpdate])

  return (
    <div className="flex h-screen w-screen flex-col gap-6 p-16">
      <div className="flex items-center justify-between">
        {post && (
          <button
            className="w-fit rounded-xl bg-slate-100 px-6 py-4 text-sm text-slate-600 transition-all duration-300 active:bg-violet-100 active:text-violet-600"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://www.quickmde.com/post/${post.id}`
              )
            }}
          >
            {`https://www.quickmde.com/post/${post.id}`}
          </button>
        )}

        <div className="flex items-center justify-between">
          <Link
            href="https://github.com/uziiuzair/quickmde"
            target="_blank"
            className="w-fit rounded-xl bg-slate-100 px-6 py-4 text-sm text-slate-600 transition-all duration-300 hover:bg-violet-100 hover:text-violet-600"
          >
            <svg
              className="size-5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="w-full grow overflow-y-scroll py-4">
        <div className="justify-be tween flex h-full w-full items-center gap-8">
          <div className="relative h-full shrink-0 grow rounded-3xl bg-slate-50">
            <div className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center">
              {loading ? <LoadingIcon /> : ""}
            </div>
            <textarea
              className="h-full w-full resize-none rounded-3xl border-0 bg-transparent p-16 text-lg text-slate-950 outline-none ring-0 placeholder:text-slate-400 focus:ring-0"
              onChange={(event) =>
                !postIsLoading && setMarkdown(event.target.value)
              }
              placeholder="Type some markdown..."
              value={postIsLoading ? "" : markdown}
            />
          </div>
          <div className="prose h-full w-full max-w-screen-md shrink-0 grow overflow-y-scroll rounded-3xl p-16 shadow-lg">
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useCallback, useEffect, useState } from "react"
import Markdown from "react-markdown"

import _ from "lodash"
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

      updatePost(markdown)
        .then(() => {
          mutate()
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        })
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
      <div>
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

import React, { createContext, useContext } from "react"

import { usePost } from "@/hooks/use-post"
import { APIError, Post } from "@/types/quickmds.types"

interface PostContextProps {
  post: Post
  postIsLoading: boolean
  postHasError: APIError
  postMutate: () => Promise<Post>

  updatePost: (markdown: string) => Promise<Response>
}

const PostContext = createContext<PostContextProps>({} as PostContextProps)

export const PostProvider = ({
  postId,
  children,
}: {
  postId: string
  children: React.ReactNode
}) => {
  const { post, postHasError, postIsLoading, postMutate } = usePost(postId)

  const updatePost = (markdown: string) => {
    return fetch(`/api/post/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ markdown }),
    })
  }

  return (
    <PostContext.Provider
      value={{ post, postHasError, postIsLoading, postMutate, updatePost }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => {
  return useContext(PostContext)
}

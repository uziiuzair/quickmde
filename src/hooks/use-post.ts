import useSWR from "swr"

import { fetcher } from "@/hooks/fetcher"
import { APIError, Post } from "@/types/quickmds.types"

interface UsePostReturn {
  post: Post
  postIsLoading: boolean
  postHasError: APIError
  postMutate: () => Promise<Post>
}

export const usePost = (postId: string): UsePostReturn => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/post/${postId}`,
    fetcher
  )

  return {
    post: data,
    postIsLoading: isLoading,
    postHasError: error,
    postMutate: mutate,
  }
}

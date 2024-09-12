import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      postId: string
    }
  }
) {
  console.log(request.url)

  const { postId } = params

  const supabase = createClient()

  const { data: post, error: post_error } = await supabase
    .from("posts")
    .select()
    .eq("id", postId)
    .single()

  if (post_error) {
    return NextResponse.json(
      {
        error_at: "post_fetch_error",
        error: post_error,
        message: "An error occurred while fetching the post.",
      },
      {
        status: 500,
      }
    )
  }

  return NextResponse.json(post)
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      postId: string
    }
  }
) {
  const { postId } = params

  const supabase = createClient()
  const body = await request.json()

  const { error: post_error } = await supabase
    .from("posts")
    .update({
      ...(body.markdown && { markdown: body.markdown }),
    })
    .eq("id", postId)

  if (post_error) {
    return NextResponse.json(
      {
        error_at: "post_update_error",
        error: post_error,
        message: "An error occurred while updating the post.",
      },
      {
        status: 500,
      }
    )
  }

  return NextResponse.json({ message: "Post updated successfully." })
}

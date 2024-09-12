import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/utils/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = createClient()

  const { data: post, error: post_error } = await supabase
    .from("posts")
    .insert({})
    .select("*")
    .single()

  if (post_error) {
    return NextResponse.json({ error: post_error.message }, { status: 500 })
  }

  return NextResponse.redirect(new URL(`/post/${post.id}`, request.url))
}

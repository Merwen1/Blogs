import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, subTitle, desc, img, created_at, user_id } = reqBody;

    const newPost = new Post({
      title,
      subTitle,
      desc,
      img,
      created_at,
      user_id,
    });

    const savedPost = await newPost.save();

    return NextResponse.json({
      message: "Post published successfully",
      success: true,
      savedPost,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/post";

connect();

export async function GET() {
  try {
    const posts = await Post.find().sort({ created_at: -1 });
    return NextResponse.json({
      message: "All posts",
      data: posts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

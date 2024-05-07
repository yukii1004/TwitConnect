import { Like } from "@/app/_types/Like.types";
import { NextRequest, NextResponse } from "next/server";

interface Root {
  likes: any[];
  message: string;
  status: string;
  time_taken: string;
}

export async function POST(
  postReq: NextRequest
): Promise<NextResponse<Like[]>> {
  const postBody = await postReq.json();
  const tweetID = postBody.tweetID;

  const tweetLikes: Root = await (
    await fetch(`http://194.233.84.2:6969/api/like/${tweetID}`, {
      method: "GET",
    })
  ).json();

  return NextResponse.json(tweetLikes.likes);
}

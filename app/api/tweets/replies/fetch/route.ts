import { ReplyWithUser } from "@/app/_types/Replies.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  postReq: NextRequest
): Promise<NextResponse<ReplyWithUser[]>> {
  const postBody = await postReq.json();
  const tweetID = postBody.tweetID;

  const fetchedReplies = await (
    await fetch(`${process.env.BASE_URL}/api/reply/${tweetID}`)
  ).json();

  return NextResponse.json(fetchedReplies.reply);
}

import { Reply } from "@/app/_types/Replies.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest): Promise<NextResponse<Reply>> {
  const postBody = await postReq.json();
  const tweetID = postBody.tweetID;
  const replyContent = postBody.replyContent;
  const userID = postBody.userID;

  const replyID = Math.floor(Math.random() * 10000);

  const createReply = await fetch(`${process.env.BASE_URL}/api/reply/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userID,
      reply_id: replyID,
      tweet_id: tweetID,
      date_created: new Date(),
      date_updated: new Date(),
      reply_content: replyContent,
    }),
  });

  const addedComment: Reply = {
    user_id: userID,
    reply_id: replyID,
    tweet_id: tweetID,
    date_created: new Date(),
    date_updated: new Date(),
    reply_content: replyContent,
  };

  return NextResponse.json(addedComment);
}

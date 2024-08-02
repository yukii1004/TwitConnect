import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest) {
  const postBody = await postReq.json();
  const tweetID = postBody.tweetID;
  const userID = postBody.userID;

  const isLiked = await (
    await fetch(`${process.env.BASE_URL}/api/like/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tweet_id: tweetID,
        user_id: userID,
      }),
    })
  ).json();

  return NextResponse.json({
    status: "success",
  });
}

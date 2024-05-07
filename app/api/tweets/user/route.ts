import { Tweet } from "@/app/_types/Tweet.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  postReq: NextRequest
): Promise<NextResponse<Tweet[] | {}[]>> {
  const postBody = await postReq.json();
  const userID = postBody.userID;

  const userTweets = await fetch(
    `${process.env.BASE_URL}/api/user/${userID}/tweets`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (userTweets.status === 200) {
    const postJson = await userTweets.json();

    return NextResponse.json(postJson.tweets);
  } else {
    return NextResponse.json([{}]);
  }
}

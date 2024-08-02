import { Tweet } from "@/app/_types/Tweet.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  postReq: NextRequest
): Promise<NextResponse<Tweet[]>> {
  const postBody = await postReq.json();
  const userID = postBody.userID;

  console.log(userID);

  const mockTweet = await (
    await fetch(`${process.env.BASE_URL}/api/me/tweets/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  return NextResponse.json(mockTweet.recommendations);
}

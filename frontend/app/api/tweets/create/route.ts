import { Tweet } from "@/app/_types/Tweet.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest): Promise<
  NextResponse<
    | Tweet
    | {
        status: number;
        body: string;
      }
  >
> {
  const postBody = await postReq.json();
  const userID = postBody.userID;
  const tweetContent = postBody.tweetContent;
  const tweetImage = postBody.tweetImage;
  const tweetID = Math.floor(Math.random() * 100000);
  try {
    console.log(
      JSON.stringify({
        tweet_id: tweetID,
        content: tweetContent,
        user_id: userID,
        date_created: new Date(),
        date_updated: new Date(),
      })
    );

    const tweetResponse = await (
      await fetch(`${process.env.BASE_URL}/api/tweet/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweet_id: tweetID,
          content: tweetContent,
          user_id: userID,
          date_created: new Date(),
          date_updated: new Date(),
        }),
      })
    ).json();

    return NextResponse.json({
      tweet_id: tweetID,
      content: tweetContent,
      user_id: userID,
      date_created: new Date(),
      date_updated: new Date(),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      body: "Something went wrong",
    });
  }
}

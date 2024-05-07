import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest): Promise<
  NextResponse<{
    isAdded: boolean;
  }>
> {
  const postBody = await postReq.json();
  const userID = postBody.userID;
  const followerID = postBody.followerID;

  const followedUser = await (
    await fetch(`${process.env.BASE_URL}/api/follower/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
        follower_id: followerID,
      }),
    })
  ).json();

  return NextResponse.json({
    isAdded: true,
  });
}

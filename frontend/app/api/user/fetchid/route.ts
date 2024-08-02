import { User } from "@/app/_types/User.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest): Promise<NextResponse<User>> {
  const postBody = await postReq.json();
  const userID = postBody.userID;
  const fetchedUser: User = await (
    await fetch(`${process.env.BASE_URL}/api/user/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  return NextResponse.json(fetchedUser);
}

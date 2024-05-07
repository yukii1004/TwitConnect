import { User } from "@/app/_types/User.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  postReq: NextRequest
): Promise<NextResponse<User[]>> {
  const postBody = await postReq.json();
  const userID = postBody.userID;

  const fetchUsers = await (
    await fetch(`${process.env.BASE_URL}/api/me/users/${userID}`)
  ).json();

  const fetchedUsers = await (
    await fetch("http://localhost:3000/api/user/fetchid", {
      method: "POST",
      body: JSON.stringify({
        userID: 16987660,
      }),
    })
  ).json();

  return NextResponse.json([fetchUsers.recommendations]);
}

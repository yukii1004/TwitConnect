import { NextRequest, NextResponse } from "next/server";

export interface ImgurResponse {
  data: {
    id: string;
    title: string;
    description: string;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: string;
    favorite: boolean;
    nsfw: string;
    section: string;
    account_url: string;
    account_id: number;
    is_ad: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    tags: string[];
    ad_type: number;
    ad_url: string;
    edited: string;
    in_gallery: boolean;
    deletehash: string;
    name: string;
    link: string;
  };
  success: boolean;
  status: number;
}

export async function POST(
  postReq: NextRequest
): Promise<NextResponse<string>> {
  const formData = new FormData();
  postReq.formData;
  formData.append("image", (await postReq.json()).uploadImage);
  formData.append("type", "base64");
  const imgurResponse = await fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    body: formData,
    redirect: "follow",
  });

  const imageData: ImgurResponse = await imgurResponse.json();
  return NextResponse.json(imageData.data.link);
}

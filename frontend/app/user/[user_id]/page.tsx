"use client";

import { useSession } from "next-auth/react";
import Sidebar from "../../_components/SideBar";
import { Session } from "next-auth";
import Recommended from "../../_components/Recommended";
import SearchBar from "../../_components/SearchBar";
import Navbar from "../../_components/Navbar";
import TweetBox from "../../_components/Tweet";
import { useEffect, useState } from "react";
import { User } from "@/app/_types/User.types";
import { Tweet, TweetResponse } from "@/app/_types/Tweet.types";
import { Data } from "@/app/page";

export interface ResTweet {
  message: string;
  status: string;
  time_taken: string;
  tweets: Tweet[];
}

const randomColor = require("randomcolor");
const randomColors = randomColor();

export default function Profile({ params }: { params: { user_id: string } }) {
  const userSession = useSession();
  const [recommendedUsers, setRecommendedUsers] = useState<User[]>();
  const [userProfile, setUserProfile] = useState<Data>();
  const [userPosts, setUserPosts] = useState<Tweet[]>();

  useEffect(() => {
    if (!userProfile)
      fetch("/api/user/fetch", {
        method: "POST",
        body: JSON.stringify({
          userHandle: params.user_id,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setUserProfile(recJson);
        });

    if (userProfile)
      fetch("/api/tweets/user", {
        method: "POST",
        body: JSON.stringify({
          userID: userProfile?.user.user_id,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setUserPosts(recJson);
        });

    if (!recommendedUsers)
      fetch("/api/user/recommended", {
        method: "POST",
        body: JSON.stringify({
          userID: 1,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setRecommendedUsers(recJson[0]);
        });
  }, [params.user_id, userProfile]);

  return (
    <main className="grid md:grid-cols-9 py-5 md:py-12 px-5 sm:px-10 md:px-10 font-Montserrat">
      <div className="col-span-1 h-full m-2 rounded-xl hidden md:block">
        <Sidebar
          userSession={userProfile as Data}
          userHandle={userProfile?.user.handle as string}
        />
      </div>
      <div className="md:hidden">
        <Navbar
          userSession={userSession.data as Session}
          userHandle={userProfile?.user.handle as string}
        />
      </div>
      <div className="lg:col-span-5 md:col-span-5 h-full md:pr-10 rounded-xl my-5 md:my-0">
        <p className="text-6xl font-Outfit font-extrabold text-[#6ac6ff]">
          Profile
        </p>
        <div className="py-10 grid grid-cols-7 lg:grid-cols-7">
          {userProfile?.user.profile_pic ? (
            <div
              className="overflow-hidden col-span-3 lg:col-span-2 w-[150px] rounded-full h-[150px] bg-center bg-cover"
              style={{
                backgroundImage: `url(${userProfile?.user.profile_pic})`,
              }}
            ></div>
          ) : (
            <div
              className="w-[150px] h-[150px] col-span-3 md:col-span-2 rounded-full flex items-center justify-center text-6xl font-Outfit font-bold text-white"
              style={{
                backgroundColor: `${randomColors}`,
              }}
            >
              {userProfile?.user.username.charAt(0)}
            </div>
          )}
          <div className="col-span-4 lg:col-span-4 w-full place-self-center">
            <p className="text-4xl text-[#333333] opacity-90 font-Outfit font-bold">
              {userProfile?.user.username.split(" ")[0]}
            </p>
            <p className="font-Outfit text-[#333333] opacity-90 font-extralight">
              @{userProfile?.user.handle}
            </p>
          </div>
        </div>
        <div className="grid gap-y-10">
          {userPosts && userPosts.length > 0
            ? userPosts?.map((userPost) => {
                return (
                  <TweetBox
                    userSession={userSession.data as Session}
                    hydrateTweet={userPost}
                    key={userPost?.tweet_id}
                  />
                );
              })
            : ""}
        </div>
      </div>
      <div className="col-span-3 h-full rounded-xl hidden md:flex flex-col">
        <div className="md:my-5">
          <SearchBar />
        </div>
        <Recommended
          recommendedUsers={recommendedUsers as User[]}
          userID={userProfile?.user.user_id as number}
        />
      </div>
    </main>
  );
}

"use client";

import { useSession } from "next-auth/react";
import Sidebar from "../../_components/SideBar";
import { Session } from "next-auth";
import PostTweet from "../../_components/PostTweet";
import Recommended from "../../_components/Recommended";
import SearchBar from "../../_components/SearchBar";
import Navbar from "../../_components/Navbar";
import TweetBox from "../../_components/Tweet";
import { useEffect, useState } from "react";
import { User } from "../../_types/User.types";
import { Tweet } from "../../_types/Tweet.types";
import { Data } from "@/app/page";

export default function HomePage({
  params,
}: {
  params: { user_handle: string };
}) {
  const userSession = useSession();
  const [recommendedUsers, setRecommendedUsers] = useState<User[]>();
  const [userProfile, setUserProfile] = useState<Data>();
  const [recommendedPosts, setRecommendedPosts] = useState<Tweet[]>();

  useEffect(() => {
    if (userProfile)
      fetch("/api/tweets/fetch", {
        method: "POST",
        body: JSON.stringify({
          userID: userProfile?.user.user_id,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setRecommendedPosts(recJson);
        });

    if (!userProfile)
      fetch("/api/user/fetch", {
        method: "POST",
        body: JSON.stringify({
          userHandle: params.user_handle,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setUserProfile(recJson);
        });

    if (userProfile)
      fetch("/api/user/recommended", {
        method: "POST",
        body: JSON.stringify({
          userID: userProfile.user.user_id,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setRecommendedUsers(recJson[0]);
        });
  }, [userProfile]);
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
        <PostTweet
          userID={userProfile?.user.user_id as number}
          userPhoto={userSession.data?.user?.image as string}
          initialTweets={recommendedPosts}
          setInitialTweets={setRecommendedPosts}
          userHandle={userProfile?.user.handle as string}
        />
        <div className="grid gap-y-10">
          {recommendedPosts?.map((userPost) => {
            return (
              <TweetBox
                userSession={userSession.data as Session}
                hydrateTweet={userPost}
                key={userPost.tweet_id}
              />
            );
          })}
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

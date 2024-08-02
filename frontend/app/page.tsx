"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Data {
  message: string;
  status: string;
  time_taken: string;
  user: User;
}

export interface User {
  banner: any;
  bio: string;
  date_created: string;
  date_updated: string;
  handle: string;
  is_private: boolean;
  profile_pic: any;
  user_id: number;
  username: string;
}

export default function Home() {
  const userSession = useSession();
  const [userProfile, setUserProfile] = useState<Data>();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    if (userSession) {
      fetch(
        `http://194.233.84.2:6969/api/user/email/${userSession.data?.user?.email}`
      )
        .then((userResp) => {
          return userResp.json();
        })
        .then((userJson) => {
          setUserProfile(userJson);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsFetching(false);
  }, [userSession.data?.user?.email]);

  return (
    <main className="h-screen grid md:grid-cols-2 place-items-center mx-10 my-10 sm:mx-0 sm:my-0">
      <img src="/assets/images/twitter.png" width={400} alt="Twitconnect" />
      <div>
        <div className="grid gap-y-4">
          <div className="text-6xl font-Outfit text-[#03a9f4] font-bold">
            Twit Connect.
          </div>
          <p className="text-4xl font-Outfit font-bold text-[#333333]">
            Connect with you loved ones.
          </p>
        </div>
        {!userSession.data && !isFetching ? (
          <button
            className="mt-10 bg-[#03a9f4] py-3 px-10 text-white font-Outfit rounded-full"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </button>
        ) : (
          <div className="mt-10">
            <Link
              href={`/home/${userProfile?.user.handle}`}
              className="bg-[#03a9f4] py-3 px-10 text-white font-Outfit rounded-full"
            >
              Start Chatting
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

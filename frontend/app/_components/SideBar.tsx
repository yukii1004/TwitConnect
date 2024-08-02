"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, type SVGProps } from "react";
import { Data } from "../page";

export function IcBaselineAccountCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20z"
      ></path>
    </svg>
  );
}

const randomColor = require("randomcolor");
const randomColors = randomColor();

export default function Sidebar({
  userSession,
  userHandle,
}: {
  userSession: Data;
  userHandle: string;
}) {
  const [isMiniMenuVisible, setIsMiniMenuVisible] = useState(false);

  return (
    <div className="grid grid-rows-7 fixed h-full">
      <div className="row-span-6">
        <Link href="/">
          <img src="/assets/images/Twitter.png" width="30px" alt="Twitter" />
        </Link>
      </div>
      <div>
        {!userSession ? (
          <button
            onClick={() => {
              signIn();
            }}
          >
            <IcBaselineAccountCircle color="#ff5f7a" className="text-3xl" />
          </button>
        ) : (
          <div className="relative ">
            <button
              onClick={() => {
                setIsMiniMenuVisible(!isMiniMenuVisible);
              }}
            >
              {userSession?.user.profile_pic ? (
                <img
                  src={userSession.user.profile_pic as string}
                  alt="Profile"
                  className="w-[40px]"
                />
              ) : (
                <div
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-xl font-Outfit font-bold text-white"
                  style={{
                    backgroundColor: `${randomColors}`,
                  }}
                >
                  {userSession?.user.username.charAt(0)}
                </div>
              )}
            </button>
            {isMiniMenuVisible ? (
              <div className="absolute bottom-12 text-xs left-0 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-6 rounded-2xl">
                <div className="py-3">
                  <Link href={`/user/${userHandle}`}>Profile</Link>
                </div>
                <hr />
                <button
                  className="py-3"
                  onClick={() => {
                    signOut({
                      callbackUrl: "/",
                      redirect: true,
                    });
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}

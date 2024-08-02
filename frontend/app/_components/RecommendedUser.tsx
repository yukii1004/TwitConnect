import { SVGProps, useState } from "react";
import { User } from "../_types/User.types";

export function IcOutlineNoAccounts(props: SVGProps<SVGSVGElement>) {
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
        d="M15.18 10.94c.2-.44.32-.92.32-1.44C15.5 7.57 13.93 6 12 6c-.52 0-1 .12-1.44.32l4.62 4.62z"
      ></path>
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM4 12c0-1.85.63-3.55 1.69-4.9l2.86 2.86a3.47 3.47 0 0 0 2.99 2.99l2.2 2.2c-.57-.1-1.15-.15-1.74-.15c-2.32 0-4.45.8-6.14 2.12A7.957 7.957 0 0 1 4 12zm8 8c-1.74 0-3.34-.56-4.65-1.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5zm6.31-3.1L7.1 5.69A7.902 7.902 0 0 1 12 4c4.42 0 8 3.58 8 8c0 1.85-.63 3.54-1.69 4.9z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsCircles(props: SVGProps<SVGSVGElement>) {
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
        d="M17 1q2.5 0 4.25 1.75T23 7q0 2.5-1.75 4.25T17 13q-2.5 0-4.25-1.75T11 7q0-2.5 1.75-4.25T17 1Zm.1 14.025q.725 0 1.413-.15t1.337-.425q-.525 3.275-3.025 5.413T11 22q-1.875 0-3.513-.713t-2.85-1.924q-1.212-1.213-1.925-2.85T2 13q0-3.325 2.138-5.825T9.55 4.15q-.275.675-.413 1.4T9 7q.05 3.35 2.4 5.688t5.7 2.337Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsAddCircleOutlineRounded(
  props: SVGProps<SVGSVGElement>
) {
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
        d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11h-3V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v3H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h3Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  );
}

const randomColor = require("randomcolor");
const randomColors = randomColor();

export default function RecommenedUser({
  userID,
  recommendedUser,
}: {
  userID: number;
  recommendedUser: User;
}) {
  const [componenetStatus, setComponentStatus] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <div
      className="flex w-full justify-between items-center py-3"
      key={recommendedUser.user_id}
    >
      <div className="flex items-center flex-grow">
        {recommendedUser.profile_pic ? (
          <img
            src={recommendedUser.profile_pic as string}
            alt="Profile"
            className="w-[50px] rounded-[20px]"
          />
        ) : (
          <div
            className="w-[50px] h-[50px] rounded-[20px] flex items-center justify-center text-xl font-Outfit font-bold text-white"
            style={{
              backgroundColor: `${randomColors}`,
            }}
          >
            {recommendedUser?.username?.charAt(0)}
          </div>
        )}
        <div className="flex flex-col text-xs ml-4">
          <p className="text-[#3D534F]">{recommendedUser.username}</p>
          <p>@{recommendedUser.handle}</p>
        </div>
      </div>
      {!componenetStatus ? (
        <>
          {!isFollowed ? (
            <button
              className="text-2xl"
              onClick={async () => {
                setComponentStatus(true);
                const followStatus: {
                  isAdded: boolean;
                } = await (
                  await fetch("/api/user/follow", {
                    method: "POST",
                    body: JSON.stringify({
                      userID: userID,
                      followerID: recommendedUser.user_id,
                    }),
                  })
                ).json();
                setComponentStatus(false);
                if (followStatus.isAdded) {
                  setIsFollowed(true);
                }
              }}
            >
              <MaterialSymbolsAddCircleOutlineRounded />
            </button>
          ) : (
            <button
              className="text-2xl"
              onClick={async () => {
                setComponentStatus(true);
                const followStatus: {
                  isUnfollowed: boolean;
                } = await (
                  await fetch("/api/user/unfollow", {
                    method: "POST",
                    body: JSON.stringify({
                      userID: userID,
                      followerID: recommendedUser.user_id,
                    }),
                  })
                ).json();
                setComponentStatus(false);
                if (followStatus.isUnfollowed) {
                  setIsFollowed(false);
                }
              }}
            >
              <IcOutlineNoAccounts />
            </button>
          )}
        </>
      ) : (
        <div className="text-2xl animate-spin">
          <MaterialSymbolsCircles />
        </div>
      )}
    </div>
  );
}

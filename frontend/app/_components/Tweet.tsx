import { Session } from "next-auth";
import { SVGProps, useEffect, useState } from "react";
import { Tweet, TweetResponse } from "../_types/Tweet.types";
import { Like } from "../_types/Like.types";
import { ReplyWithUser } from "../_types/Replies.types";
import { Data } from "../page";
import Reply from "./Reply";

export function MaterialSymbolsSendRounded(props: SVGProps<SVGSVGElement>) {
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
        d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsFavoriteOutlineRounded(
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
        d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125ZM11.05 6.75q-.725-1.025-1.55-1.562t-2-.538q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837q1.287 1.375 2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575q1.287-1.375 2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .537T12.95 6.75q-.175.25-.425.375T12 7.25q-.275 0-.525-.125t-.425-.375Zm.95 4.725Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsFavoriteRounded(props: SVGProps<SVGSVGElement>) {
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
        d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z"
      ></path>
    </svg>
  );
}

const randomColor = require("randomcolor");
const randomColors: any = randomColor();

export default function TweetBox({
  userSession,
  hydrateTweet,
}: {
  userSession: Session;
  hydrateTweet: Tweet;
}) {
  const [userProfile, setUserProfile] = useState<Data>();
  const [postLikes, setPostLikes] = useState<Like[]>();
  const [userLiked, setUserLiked] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentVisible, setCommentVisible] = useState(false);
  const [postComments, setPostComments] = useState<ReplyWithUser[]>();
  const [tweetUser, setTweetUser] = useState<Data>();

  useEffect(() => {
    if (!postComments)
      fetch("/api/tweets/replies/fetch", {
        method: "POST",
        body: JSON.stringify({
          tweetID: hydrateTweet.tweet_id,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setPostComments(recJson);
        });

    if (!userProfile)
      fetch("/api/user/fetch", {
        method: "POST",
        body: JSON.stringify({
          userHandle: userSession.user?.email?.split("@")[0],
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setUserProfile(recJson);
        });

    if (!tweetUser)
      fetch("/api/user/fetchid", {
        method: "POST",
        body: JSON.stringify({
          userID: hydrateTweet.user_id,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setTweetUser(recJson);
        });

    if (userProfile && !postLikes)
      fetch("/api/tweets/likes/fetch", {
        method: "POST",
        body: JSON.stringify({
          tweetID: hydrateTweet?.tweet_id,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson: Like[]) => {
          if (
            recJson.find((tweetLike) => {
              return (
                tweetLike.user_id == userProfile?.user.user_id &&
                tweetLike.tweet_id == hydrateTweet?.tweet_id
              );
            })
          ) {
            setUserLiked(true);
          }

          setPostLikes(recJson);
        });
  }, [userProfile]);

  return (
    <>
      <div className="rounded-[60px] bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <div className="flex pt-8 px-8">
          <div className="flex">
            <div className="overflow-hidden rounded-[20px]">
              {tweetUser?.user.profile_pic ? (
                <img
                  src={tweetUser.user.profile_pic as string}
                  alt="Profile"
                  className="w-[50px]"
                />
              ) : (
                <div
                  className="w-[50px] h-[50px] rounded-[20px] flex items-center justify-center text-xl font-Outfit font-bold text-white"
                  style={{
                    backgroundColor: `${randomColors}`,
                  }}
                >
                  {tweetUser?.user.username.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex justify-center flex-col ml-4 text-[#333333] opacity-90">
              <p className="text-sm">{tweetUser?.user.username}</p>
              <p className="text-xs">@{tweetUser?.user.handle}</p>
            </div>
          </div>
          <p className="font-Montserrat flex items-center flex-grow justify-end px-4 text-[#98a1a1] text-xs">
            {Math.floor(
              (new Date().getTime() -
                new Date(hydrateTweet?.date_created).getTime()) /
                1000 /
                60
            )}
            mins ago
          </p>
        </div>
        <p className="text-[#333333] opacity-90 font-Outfit font-extralight py-5 px-24">
          {hydrateTweet?.content}
        </p>
        {hydrateTweet?.image ? (
          <div>
            <img src={hydrateTweet?.image} alt="Mock" />
          </div>
        ) : (
          ""
        )}
        <div className="grid py-5 place-items-end px-10">
          <div className="grid grid-cols-2 gap-x-10 w-fit">
            <div
              className="grid grid-cols-2 gap-x-4 place-items-center cursor-pointer"
              onClick={() => {
                setCommentVisible(!commentVisible);
              }}
            >
              <img src="/assets/images/messages2.png" alt="Comments" />
              <p className="text-[#98a1a1] font-Montserrat mt-1">
                {postComments?.length}
              </p>
            </div>
            <div className="grid grid-cols-2 place-items-center gap-x-4 cursor-pointer">
              {userLiked ? (
                <MaterialSymbolsFavoriteRounded
                  className="text-red-500 text-2xl"
                  onClick={async () => {
                    await fetch("/api/tweets/likes/unlike", {
                      method: "POST",
                      body: JSON.stringify({
                        tweetID: hydrateTweet?.tweet_id,
                        userID: userProfile?.user.user_id,
                      }),
                    });
                    setPostLikes(
                      postLikes?.filter((postLike) => {
                        return postLike.user_id != userProfile?.user.user_id;
                      })
                    );
                    setUserLiked(false);
                  }}
                />
              ) : (
                <MaterialSymbolsFavoriteOutlineRounded
                  className="text-red-500 text-2xl"
                  onClick={async () => {
                    await fetch("/api/tweets/likes/like", {
                      method: "POST",
                      body: JSON.stringify({
                        tweetID: hydrateTweet?.tweet_id,
                        userID: userProfile?.user.user_id,
                      }),
                    });
                    setPostLikes([
                      {
                        tweet_id: hydrateTweet?.tweet_id,
                        user_id: userProfile?.user.user_id as number,
                      },
                      ...(postLikes as Like[]),
                    ]);
                    setUserLiked(true);
                  }}
                />
              )}
              <p className="text-[#98a1a1] font-Montserrat mt-1">
                {postLikes?.length}
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {commentVisible ? (
        <div className="grid gap-y-3">
          <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-[20px] grid">
            <div className="flex w-full justify-between p-3">
              <div className="overflow-hidden rounded-[15px] w-fit">
                <img
                  src={userSession?.user?.image as string}
                  alt="Profile"
                  className="w-[40px]"
                />
              </div>
              <input
                type="text"
                placeholder="Comment..."
                className="outline-none border-none text-sm flex-grow mx-4"
                onChange={(eV) => {
                  setCommentValue(eV.target.value);
                }}
              />
              <button
                className="text-2xl place-content-end"
                onClick={async () => {
                  const addedComment = await (
                    await fetch("/api/tweets/replies/create", {
                      method: "POST",
                      body: JSON.stringify({
                        tweetID: hydrateTweet?.tweet_id,
                        userID: userProfile?.user.user_id,
                        replyContent: commentValue,
                      }),
                    })
                  ).json();

                  if (postComments) {
                    setPostComments([addedComment, ...postComments]);
                  } else {
                    setPostComments([addedComment]);
                  }
                }}
              >
                <MaterialSymbolsSendRounded className="text-[#6ac6ff]" />
              </button>
            </div>
          </div>
          {postComments?.length > 0 ? (
            <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-[20px] grid">
              {postComments?.map((postComment) => {
                return (
                  <Reply postComment={postComment} key={postComment.user_id} />
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

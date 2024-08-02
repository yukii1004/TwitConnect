import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { Tweet, TweetResponse } from "../_types/Tweet.types";

export default function PostTweet({
  userID,
  userPhoto,
  setInitialTweets,
  initialTweets,
  userHandle,
}: {
  userID: number;
  userPhoto: string;
  setInitialTweets: CallableFunction;
  initialTweets: Tweet[] | undefined;
  userHandle: string;
}) {
  const [postText, setPostText] = useState("");
  const [imageBoxVisible, setImageBoxVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [uploadState, setUploadState] = useState(false);

  return (
    <div className="rounded-[60px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-10 text-sm font-Montserrat bg-white flex flex-col justify-between">
      <div className="flex py-8 px-8">
        <div>
          <img
            src={userPhoto}
            alt="Profile"
            className="w-[50px] rounded-[21px]"
          />
        </div>
        <input
          type="text"
          className="outline-none border-none rounded-xl px-4 flex-grow text-[#98a1a1]"
          placeholder="Write..."
          onChange={(eV) => {
            setPostText(eV.target.value);
          }}
        />
      </div>
      {imageBoxVisible ? (
        <div className="px-16 py-5">
          <ImageUpload setImageUrlExt={setImageUrl} />
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-2 w-fit py-5 px-10 place-content-center place-self-end place-items-center">
        <div className="cursor-pointer">
          <img
            src="/assets/images/attachcircle.svg"
            width="25px"
            alt="Attachment"
            onClick={() => {
              setImageBoxVisible(!imageBoxVisible);
            }}
          />
        </div>
        <div>
          <button
            className="bg-[#ff546c] font-Montserrat text-xs shadow-xl px-3 py-2 text-white rounded-xl"
            onClick={async () => {
              setPostText("");
              setImageBoxVisible(false);
              setUploadState(true);
              const addedPost: Tweet = await (
                await fetch("/api/tweets/create", {
                  method: "POST",
                  body: imageUrl
                    ? JSON.stringify({
                        userID: userID,
                        tweetContent: postText,
                        tweetImage: imageUrl,
                      })
                    : JSON.stringify({
                        userID: userID,
                        tweetContent: postText,
                      }),
                })
              ).json();
              setUploadState(false);
              if (initialTweets) {
                setInitialTweets([addedPost, ...initialTweets]);
              } else {
                setInitialTweets([addedPost]);
              }
            }}
          >
            {uploadState ? (
              <div className="px-3.5 py-1">
                <div className="dot-flashing"></div>
              </div>
            ) : (
              "Tweet"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Reply } from "../_types/Replies.types";
import { Data } from "../page";

const randomColor = require("randomcolor");
const randomColors: any = randomColor();

export default function Reply({ postComment }: { postComment: Reply }) {
  const [replyUser, setReplyUser] = useState<Data>();
  useEffect(() => {
    if (!replyUser)
      fetch("/api/user/fetchid", {
        method: "POST",
        body: JSON.stringify({
          userID: postComment.user_id,
        }),
      })
        .then((recResponse) => {
          return recResponse.json();
        })
        .then((recJson) => {
          setReplyUser(recJson);
        });
  }, [replyUser]);

  console.log(replyUser);

  return (
    <div className="flex w-full p-3 items-center" key={postComment.tweet_id}>
      <div className="overflow-hidden rounded-[15px] w-fit">
        {replyUser?.user.profile_pic ? (
          <img
            src={replyUser.user.profile_pic as string}
            alt="Profile"
            className="w-[40px]"
          />
        ) : (
          <div
            className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center text-xl font-Outfit font-bold text-white"
            style={{
              backgroundColor: `${randomColors}`,
            }}
          >
            {replyUser?.user.username.charAt(0)}
          </div>
        )}
      </div>
      <div className="text-[#333333] opacity-90 flex flex-col justify-evenly h-full mx-2">
        <p className="text-xs font-bold">@{replyUser?.user.handle}</p>
        <p className="text-xs font-medium">{postComment.reply_content}</p>
      </div>
    </div>
  );
}

import { User } from "../_types/User.types";
import RecommenedUser from "./RecommendedUser";

export default function Recommended({
  userID,
  recommendedUsers,
}: {
  userID: number;
  recommendedUsers: User[];
}) {
  return (
    <div className="rounded-[50px] px-8 w-full bg-white font-Montserrat text-[#78A79E] py-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {recommendedUsers?.map((recommendedUser) => {
        return (
          <RecommenedUser
            recommendedUser={recommendedUser}
            userID={userID}
            key={recommendedUser.user_id}
          />
        );
      })}
    </div>
  );
}

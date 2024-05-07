export type Reply = {
  reply_id: number;
  tweet_id: number;
  user_id: number;
  reply_content: string;
  date_created: Date;
  date_updated: Date;
};

export type ReplyWithUser = {
  reply_id: number;
  tweet_id: number;
  user_id: number;
  reply_content: string;
  date_created: Date;
  date_updated: Date;
  handle: string;
  profile_pic: string;
};

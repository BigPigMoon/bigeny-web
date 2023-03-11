import { PostData } from "./PostResponse.type";

export type ChannelData = {
  id: number;
  avatar: string | null;
  description: string | null;
  ownerId: number;
  name: string;
  lastPost: PostData;
  subscribe: boolean;
};

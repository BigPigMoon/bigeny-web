import { MessageData } from "./MessageResponse.type";

export type DialogData = {
  id: number;
  name: string;
  avatar: string;
  isReaded: boolean;
  countOfUser: number;
  lastMessage: MessageData;
};

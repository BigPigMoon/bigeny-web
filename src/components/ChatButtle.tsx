import * as React from "react";
import { API_URL } from "../http";

type ChatBubbleProps = {
  name: string;
  avatar: string | null;
  message: string;
  createdAt: string;
  left: boolean;
};

const ChatBubble = ({
  name,
  avatar,
  createdAt,
  message,
  left,
}: ChatBubbleProps) => {
  return (
    <>
      <div
        className={`chat ${left ? "chat-start" : "chat-end"} m-0 p-0 true-z`}
      >
        {avatar ? (
          <div className="chat-image avatar true-z w-10 h-10">
            <div className="rounded-full">
              <img src={`${API_URL}/store/download/${avatar}`} alt="" />
            </div>
          </div>
        ) : (
          <div className="chat-image avatar placeholder true-z">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
              <span className="text-2xl">{name[0].toUpperCase()}</span>
            </div>
          </div>
        )}
        <div className="chat-header">
          {name}
          <time className="text-xs opacity-50"> {createdAt}</time>
        </div>
        <div className="chat-bubble">{message}</div>
      </div>
    </>
  );
};
export default ChatBubble;

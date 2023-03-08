import React, { useState } from "react";
import ColumnContent from "./ColumnContent";
import Post from "./Post";
import useSWR from "swr";
import { PostData } from "../types";
import parseJwt from "../utils/parseJWT";
import { useToken } from "../store";
import $api, { fetcher } from "../http";

type ChannelViewProps = {
  id: number;
  ownerId: number;
};

const ChannelContent = ({ id, ownerId }: ChannelViewProps) => {
  const { data, mutate } = useSWR<PostData[]>(`/posts/channel/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  const [content, setContent] = useState("");
  const userSelfId: number = parseJwt(useToken.getState().access).sub;

  const send = async () => {
    await $api
      .post("/posts/create", {
        content: content,
        image: null,
        channelId: id,
      })
      .then((res) => {
        if (data) {
          mutate([...data, res.data]);
        }
        setContent("");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="flex flex-col w-full">
      <ColumnContent className="h-full">
        {data &&
          data.map((val: PostData) => (
            <Post
              id={val.id}
              channelId={val.channelId}
              key={val.id}
              content={val.content}
              createdAt={new Date(Date.parse(val.createdAt))}
              image={val.image}
            />
          ))}
      </ColumnContent>
      <div className="flex items-end w-full p-4">
        <input
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Type here"
          className="input w-full"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 m-4 cursor-pointer"
          onClick={async () => {
            await send();
          }}
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </div>
    </div>
  );
};

export default ChannelContent;

import React, { useState } from "react";
import ColumnContent from "../common/ColumnContent";
import Post from "../posts/Post";
import useSWR from "swr";
import { PostData } from "../../types";
import parseJwt from "../../utils/parseJWT";
import { useToken } from "../../store";
import $api, { fetcher } from "../../http";
import SendInput from "../common/SendInput";
import getDate from "../../helper/date";

type ChannelViewProps = {
  avatar?: boolean;
  id: number;
  ownerId: number;
  sub: boolean;
};

const ChannelContent = ({ sub, avatar, id, ownerId }: ChannelViewProps) => {
  const { data, mutate } = useSWR<PostData[]>(`/posts/channel/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  const [subscription, setSubscription] = useState(sub);
  const userSelfId: number = parseJwt(useToken.getState().access).sub;

  const subscribe = () => {
    $api.post("/channels/sub/" + id).then((res) => {
      if (res.data) {
        setSubscription(!subscription);
      }
    });
  };

  const send = (
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    $api
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
              createdAt={getDate(val.createdAt)}
              image={val.image}
              avatar={avatar}
            />
          ))}
      </ColumnContent>
      {userSelfId === ownerId ? (
        <SendInput send={send} />
      ) : (
        <button onClick={() => subscribe()} className="btn btn-accent m-4">
          {subscription ? "unsubscribe" : "subscribe"}
        </button>
      )}
    </div>
  );
};

export default ChannelContent;

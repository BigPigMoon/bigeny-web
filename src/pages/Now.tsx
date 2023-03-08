import React, { useEffect } from "react";
import ColumnContent from "../components/ColumnContent";
import WallContent from "../components/WallContent";
import Post from "../components/Post";
import useSWR from "swr";
import { fetcher } from "../http";
import { ChannelData, PostData } from "../types";

const Now = () => {
  const { data, isLoading } = useSWR<PostData[]>("/posts", fetcher);

  return (
    <>
      <WallContent>
        <ColumnContent>
          {data &&
            data.map((val) => (
              <Post
                key={val.id}
                id={val.id}
                avatar={true}
                channelId={val.channelId}
                content={val.content}
                createdAt={new Date(Date.parse(val.createdAt))}
                image={val.image}
              />
            ))}
        </ColumnContent>
      </WallContent>
    </>
  );
};

export default Now;

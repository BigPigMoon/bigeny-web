import React from "react";
import ColumnContent from "../components/ColumnContent";
import WallContent from "../components/WallContent";
import Post from "../components/Post";
import useSWR from "swr";
import { fetcher } from "../http";
import { PostData } from "../types";
import getDate from "../helper/date";
import Loading from "../components/Loading";

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
                createdAt={getDate(val.createdAt)}
                image={val.image}
              />
            ))}
          {isLoading && <Loading />}
        </ColumnContent>
      </WallContent>
    </>
  );
};

export default Now;

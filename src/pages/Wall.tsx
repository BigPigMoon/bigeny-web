import React from "react";
import Post from "../components/Post";
import WallContent from "../components/WallContent";
import ColumnContent from "../components/ColumnContent";
import useSWR from "swr";
import { PostData } from "../types";
import { fetcher } from "../http";
import getDate from "../helper/date";
import Loading from "../components/Loading";

const Wall = () => {
  const { data, isLoading } = useSWR<PostData[]>("/posts/subs", fetcher);

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

export default Wall;

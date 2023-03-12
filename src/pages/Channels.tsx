import React, { useState } from "react";
import MiniDialog from "../components/common/MiniDialog";
import ColumnContent from "../components/common/ColumnContent";
import { fetcher } from "../http";
import CreateChannelModal from "../components/channels/CreateChannelModal";
import WallContent from "../components/common/WallContent";
import useSWR from "swr";
import Loading from "../components/common/Loading";
import ChannelContent from "../components/channels/ChannelContent";
import { ChannelData } from "../types";

const Channels = () => {
  const [channelId, setChannelId] = useState<number | null>(null);
  const [ownerId, setOwnerId] = useState(0);
  const [sub, setSub] = useState(false);
  const { data, isLoading, mutate } = useSWR<ChannelData[]>(
    "channels/subs",
    fetcher
  );

  return (
    <>
      <CreateChannelModal mutate={mutate} data={data} />
      <WallContent bottomButton={true}>
        <ColumnContent className={channelId ? "w-2/3" : ""}>
          {data &&
            data.map((val: ChannelData) => (
              <MiniDialog
                onClick={(e) => {
                  setChannelId(val.id);
                  setOwnerId(val.ownerId);
                  setSub(val.subscribe);
                }}
                key={val.id}
                avatar={val.avatar}
                name={val.name}
                lastPost={
                  channelId ? null : val.lastPost ? val.lastPost.content : ""
                }
              />
            ))}
          {isLoading && <Loading />}
        </ColumnContent>
        {channelId && (
          <ChannelContent id={channelId} ownerId={ownerId} sub={sub} />
        )}
      </WallContent>
    </>
  );
};

export default Channels;

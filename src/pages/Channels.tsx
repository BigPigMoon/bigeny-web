import React, { useState } from "react";
import MiniDialog from "../components/MiniDialog";
import ColumnContent from "../components/ColumnContent";
import { fetcher } from "../http";
import CreateChannelModal from "../components/CreateChannelModal";
import WallContent from "../components/WallContent";
import useSWR from "swr";
import Loading from "../components/Loading";
import ChannelContent from "../components/ChannelContent";
import { ChannelData } from "../types";

const Channels = () => {
  const [channelId, setChannelId] = useState<number | null>(null);
  const [ownerId, setOwnerId] = useState(0);
  const { data, isLoading, mutate } = useSWR<ChannelData[]>(
    "channels",
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
                }}
                key={val.id}
                avatar={val.avatar}
                name={val.name}
                lastPost={null}
              />
            ))}
          {isLoading && <Loading />}
        </ColumnContent>
        {channelId && <ChannelContent id={channelId} ownerId={ownerId} />}
      </WallContent>
    </>
  );
};

export default Channels;
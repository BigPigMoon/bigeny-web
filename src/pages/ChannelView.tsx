import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WallContent from "../components/WallContent";
import ChannelContent from "../components/ChannelContent";
import { fetcher } from "../http";
import useSWR from "swr";
import { ChannelData } from "../types";

const ChannelView = () => {
  const { id } = useParams();
  const { data, error } = useSWR<ChannelData>("channels/" + id, fetcher);

  const navigate = useNavigate();

  useEffect(() => {
    if (data === null || error) navigate("/notfound");
  }, [data, navigate, error]);

  return (
    <>
      {data && (
        <WallContent>
          <ChannelContent
            avatar={true}
            id={data.id}
            ownerId={data.ownerId}
            sub={data.subscribe}
          />
        </WallContent>
      )}
    </>
  );
};

export default ChannelView;

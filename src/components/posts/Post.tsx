import React from "react";
import useSWR from "swr";
import { ChannelData, RateData } from "../../types";
import $api, { API_URL, fetcher } from "../../http";
import Loading from "../common/Loading";
import { useNavigate } from "react-router-dom";

type PostProps = {
  id: number;
  avatar?: boolean;
  channelId: number;
  image: string | null;
  createdAt: string;
  content: string;
};

const Post = ({
  id,
  avatar,
  channelId,
  image,
  createdAt,
  content,
}: PostProps) => {
  const { data: channel, isLoading } = useSWR<ChannelData>(
    `/channels/${channelId}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const { data: rate, mutate } = useSWR<RateData>(
    `/posts/rate/${id}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const navigate = useNavigate();

  const like = () => {
    $api
      .post("/posts/rate/" + id)
      .then((res) => {
        if (rate) {
          mutate({ rate: rate.rate++, userRate: !rate.userRate });
        }
      })
      .catch((err) => console.log(err));
  };

  const goToChannel = () => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="card  bg-base-100 shadow-xl">
        <div className="card-body pb-0">
          {channel && (
            <div
              onClick={() => {
                if (avatar) goToChannel();
              }}
              className={`flex space-x-3 ${avatar && "cursor-pointer"}`}
            >
              {avatar && (
                <figure className="flex self-center h-full">
                  {channel.avatar ? (
                    <div className="avatar  w-20 h-20">
                      <div className="rounded-full">
                        <img
                          src={`${API_URL}/store/download/${channel.avatar}`}
                          alt=""
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar placeholder ">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-20 h-20">
                        <span className="text-5xl">
                          {channel?.name[0].toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                </figure>
              )}
              <div className="flex flex-col">
                <h2 className="card-title">{channel.name}</h2>
                <p>{createdAt}</p>
              </div>
            </div>
          )}
        </div>
        {image && (
          <figure className="px-10 py-4">
            <img src={image} alt="" className="rounded-xl" />
          </figure>
        )}
        <div className="card-body">
          <p>{content}</p>
          <div className="card-actions justify-end">
            {rate && (
              <button className="btn gap-2" onClick={() => like()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={rate.userRate ? "white" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {rate.rate}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

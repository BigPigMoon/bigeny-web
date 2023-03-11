import React from "react";
import WallContent from "../components/WallContent";
import ColumnContent from "../components/ColumnContent";
import { API_URL, fetcher } from "../http";
import useSWR from "swr";
import { UserData } from "../types";

const Profile = () => {
  const { data } = useSWR<UserData>("/users/me", fetcher);
  return (
    <>
      <WallContent>
        <ColumnContent>
          {data && (
            <div className="card lg:card-side h-full true-z bg-base-100 shadow-xl justify-center">
              <figure>
                {data.avatar ? (
                  <div className="chat-image avatar true-z w-64 h-64 justify-center">
                    <div className="rounded-full">
                      <img
                        src={`${API_URL}/store/download/${data.avatar}`}
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  <div className="chat-image avatar placeholder true-z justify-center">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-64 h-64">
                      <span className="text-9xl">
                        {data.nickname[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">New album is released!</h2>
                <p>Click the button to listen on Spotiwhy app.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Update</button>
                </div>
              </div>
            </div>
          )}
        </ColumnContent>
      </WallContent>
    </>
  );
};

export default Profile;

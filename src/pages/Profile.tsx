import React, { useState } from "react";
import WallContent from "../components/common/WallContent";
import ColumnContent from "../components/common/ColumnContent";
import $api, { API_URL, fetcher } from "../http";
import useSWR from "swr";
import { UserData } from "../types";
import ErrorAlert from "../components/common/ErrorAlert";
import FileInput from "../components/common/FileInput";
import Input from "../components/common/Input";

const Profile = () => {
  const { data, mutate } = useSWR<UserData>("/users/me", fetcher);
  const [newName, setNewName] = useState("");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [nicknameInUse, setNicknameInUse] = useState(false);

  const update = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNicknameInUse(false);

    const avatarData = new FormData();

    let filename = null;
    if (newAvatar) {
      avatarData.append("image", newAvatar);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await $api.post("store/upload", avatarData, config).then((response) => {
        filename = response.data;
      });
    }

    if (filename) {
      $api
        .put<UserData>("/users/updateAvatar", { filename: filename })
        .then((res) => {
          if (data) {
            mutate({ ...data, avatar: res.data.avatar });
          }
        });
    }

    if (newName) {
      $api
        .put("/users/changeNickname", { nickname: newName })
        .then((res) => {
          if (data) {
            mutate({ ...data, nickname: res.data.nickname });
          }
          setNewName("");
        })
        .catch((e) => {
          if (e.response) {
            const message = e.response.data.message;
            if (message === "Nickname already in use") {
              setNicknameInUse(true);
            }
          }
        });
    }
  };

  return (
    <>
      <WallContent>
        <ColumnContent>
          {data && (
            <div className="card lg:card-side h-full  bg-base-100 shadow-xl justify-center">
              <div className="flex flex-col items-center">
                <figure className="m-5">
                  {data.avatar ? (
                    <div className="chat-image avatar  w-64 h-64 justify-center">
                      <div className="rounded-full">
                        <img
                          src={`${API_URL}/store/download/${data.avatar}`}
                          alt=""
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="chat-image avatar placeholder  justify-center">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-64 h-64">
                        <span className="text-9xl">
                          {data.nickname[0].toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                </figure>
                <div>
                  <p className="text-2xl bg-base-300 rounded-xl p-3">
                    {data.nickname}
                  </p>
                </div>
              </div>
              <div className="card-body">
                {nicknameInUse && (
                  <ErrorAlert message="Nickname already in use!" />
                )}
                <form
                  className="form-control w-full max-w-xs mx-5"
                  onSubmit={(event) => update(event)}
                >
                  <FileInput
                    name="Pick a new avatar image"
                    setFunc={setNewAvatar}
                  />
                  <Input
                    name="Update my nickname"
                    type="text"
                    setVar={setNewName}
                    placeholder="New nickname"
                    error={nicknameInUse}
                  />
                  <div className="card-actions justify-end mt-3">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </ColumnContent>
      </WallContent>
    </>
  );
};

export default Profile;

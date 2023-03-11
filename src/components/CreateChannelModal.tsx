import React, { useState } from "react";
import $api from "../http";
import { KeyedMutator } from "swr";
import { ChannelData } from "../types";

type CreateChannelModalProps = {
  mutate: KeyedMutator<ChannelData[]>;
  data: ChannelData[] | undefined;
};

const CreateChannelModal = ({ mutate, data }: CreateChannelModalProps) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);

  const createChannel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 👇 Create new FormData object and append files
    if (name.length === 0) {
      return;
    }

    const avatarData = new FormData();

    let filename = null;
    if (avatar) {
      avatarData.append("image", avatar);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await $api.post("store/upload", avatarData, config).then((response) => {
        filename = response.data;
      });
    }

    await $api
      .post("channels/create", {
        name: name,
        avatar: filename,
        description: description,
      })
      .then((res) => {
        setChecked(false);
        if (data) {
          mutate([...data, res.data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="flex justify-center">
        <label
          onClick={() => {
            setChecked(true);
          }}
          htmlFor="my-modal-1"
          className="btn btn-accent fixed w-3/6 bottom-0 my-4"
        >
          Create channel
        </label>
      </div>
      <input
        type="checkbox"
        checked={checked}
        readOnly={true}
        id="my-modal-1"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-2/6 max-w-5xl flex justify-center">
          <label
            onClick={() => setChecked(false)}
            htmlFor="my-modal-1"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form onSubmit={(event) => createChannel(event)}>
            <div className="form-control w-full max-w-xs mx-5">
              <span className="label label-text">Pick a avatar image</span>
              <input
                type="file"
                onChange={(event) => {
                  if (event.target.files) setAvatar(event.target.files[0]);
                }}
                className="file-input file-input-bordered w-full max-w-xs"
              />
              <span className="label label-text">Name of them channel</span>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <span className="label label-text">
                Description of the channel
              </span>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-accent">
                Sumbit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateChannelModal;

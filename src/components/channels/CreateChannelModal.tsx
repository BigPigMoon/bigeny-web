import React, { useState } from "react";
import $api from "../../http";
import { KeyedMutator } from "swr";
import { ChannelData } from "../../types";
import ErrorAlert from "../common/ErrorAlert";
import Input from "../common/Input";
import FileInput from "../common/FileInput";

type CreateChannelModalProps = {
  mutate: KeyedMutator<ChannelData[]>;
  data: ChannelData[] | undefined;
};

const CreateChannelModal = ({ mutate, data }: CreateChannelModalProps) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);
  const [nameInUse, setNameInUse] = useState(false);

  const createChannel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNameInUse(false);
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
        if (e.response) {
          const message = e.response.data.message;
          if (message === "The channel name already in use") {
            setNameInUse(true);
          }
        }
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
              {nameInUse && (
                <ErrorAlert message="Channel name already in use!" />
              )}
              <FileInput
                name="Set the avatar for channel"
                setFunc={setAvatar}
              />
              <Input
                name="Name of the channel"
                type="text"
                placeholder="Channel name"
                setVar={setName}
              />
              <Input
                name="Description of the channel"
                type="text"
                placeholder="Channel description"
                setVar={setDescription}
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

import React, { useEffect, useState } from "react";
import $api, { API_URL, fetcher } from "../http";
import { KeyedMutator } from "swr";
import { DialogData, UserData } from "../types";
import useSWR from "swr";

type CreateChannelModalProps = {
  mutate: KeyedMutator<DialogData[]>;
  data: DialogData[] | undefined;
};

const CreateDialogModal = ({ mutate, data }: CreateChannelModalProps) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedUser, setCheckedUser] = useState<
    { id: number; name: string }[]
  >([]);
  const [disable, setDisable] = useState(true);

  const { data: users } = useSWR<UserData[]>("users", fetcher);

  useEffect(() => {
    setDisable(checkedUser.length < 2);
    if (checkedUser.length === 1) setName(checkedUser[0].name);
    else setName("");
  }, [checkedUser]);

  const createChannel = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkedUser.length > 1 && name.length === 0) {
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

    const dataNewDialog = {
      name: name,
      avatar: filename,
      users: checkedUser.map((v) => v.id),
    };
    console.log(dataNewDialog);
    await $api
      .post("messages/createDialog", dataNewDialog)
      .then((res) => {
        setChecked(false);
        console.log(res.data);
        // if (data) {
        //   mutate([...data, res.data]);
        // }
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
          htmlFor="my-modal-2"
          className="btn btn-accent fixed w-3/6 bottom-0 my-4"
        >
          Create dialog
        </label>
      </div>
      <input
        type="checkbox"
        checked={checked}
        readOnly={true}
        id="my-modal-2"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-4/6 h-4/6 max-w-5xl flex justify-center overflow-hidden">
          <label
            onClick={() => setChecked(false)}
            htmlFor="my-modal-2"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex w-full">
            <div className="h-full card bg-base-300 rounded-box place-items-center p-4">
              <form onSubmit={(event) => createChannel(event)}>
                <div className="form-control w-full max-w-xs mx-5">
                  <span className="label label-text">Pick a avatar image</span>
                  <input
                    disabled={disable}
                    type="file"
                    onChange={(event) => {
                      if (event.target.files) setAvatar(event.target.files[0]);
                    }}
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                  <span className="label label-text">Name of the dialog</span>
                  <input
                    disabled={disable}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
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
            <div className="divider divider-horizontal"></div>
            <div className="h-full grid flex-grow bg-base-300 rounded-box max-h-fit">
              <div className="flex overflow-hidden max-h-fit flex-col items-center p-4">
                {/* <div className="w-full pb-4">
                  <span className="label label-text">Search user</span>
                  <input
                    type="text"
                    onChange={(e) => search(e.target.value)}
                    placeholder="User..."
                    className="input input-bordered w-full"
                  />
                </div> */}
                <div className="scrollbar-hidden overflow-auto rounded-xl w-full py-4">
                  <table className="table table-compact w-full p-0">
                    <tbody>
                      {users &&
                        users.map((user) => (
                          <tr key={user.id}>
                            <th>
                              <label>
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCheckedUser([
                                        ...checkedUser,
                                        { id: user.id, name: user.nickname },
                                      ]);
                                    } else {
                                      setCheckedUser(
                                        checkedUser.filter((v) => {
                                          return v.id !== user.id;
                                        })
                                      );
                                    }
                                  }}
                                />
                              </label>
                            </th>
                            <td className="w-full">
                              <div className="flex items-center space-x-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    {user.avatar ? (
                                      <div className="avatar true-z">
                                        <div className="rounded-full">
                                          <img
                                            src={`${API_URL}/store/download/${user.avatar}`}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="avatar placeholder true-z">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12">
                                          <span className="text-3xl">
                                            {user.nickname[0].toUpperCase()}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="font-bold">{user.nickname}</div>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateDialogModal;

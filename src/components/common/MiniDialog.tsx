import React from "react";
import { API_URL } from "../../http";

type MiniDialogProps = {
  avatar: string | null;
  name: string;
  lastPost: string | null;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  readed?: boolean;
};
// TODO: large test should cut and replace on "..."

const MiniDialog = ({
  readed,
  name,
  avatar,
  lastPost,
  onClick,
}: MiniDialogProps) => {
  return (
    <>
      <div className="indicator w-full">
        {readed && <span className="indicator-item badge badge-primary"></span>}
        <div
          onClick={onClick}
          className="card cursor-pointer bg-base-100 card-side  shadow-xl w-full"
        >
          <figure className="flex ml-4 self-center h-full justify-center">
            {avatar ? (
              <div className="avatar  w-20 h-20">
                <div className="rounded-full w-20 h-20">
                  <img src={`${API_URL}/store/download/${avatar}`} alt="" />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder  h-full items-center">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-20 h-20">
                  <span className="text-5xl">{name[0].toUpperCase()}</span>
                </div>
              </div>
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title text-ellipsis whitespace-nowrap overflow-hidden">
              {name}
            </h2>
            <p>{lastPost}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiniDialog;

import React from "react";
import { API_URL } from "../http";

type MiniDialogProps = {
  avatar: string | null;
  name: string;
  lastPost: string | null;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
};
// TODO: large test should cut and replace on "..."

const MiniDialog = ({ name, avatar, lastPost, onClick }: MiniDialogProps) => {
  return (
    <>
      <div
        onClick={onClick}
        className="card cursor-pointer bg-base-100 card-side true-z shadow-xl"
      >
        <figure className="flex ml-4 self-center h-full">
          {avatar ? (
            <div className="avatar true-z w-20 h-20">
              <div className="rounded-full">
                <img src={`${API_URL}/store/download/${avatar}`} alt="" />
              </div>
            </div>
          ) : (
            <div className="avatar placeholder true-z">
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
    </>
  );
};

export default MiniDialog;

import React, { PropsWithChildren } from "react";

type WallContentProps = {
  bottomButton?: boolean;
};

const WallContent = ({
  bottomButton,
  children,
}: PropsWithChildren<WallContentProps>) => {
  return (
    <>
      <div
        className={`flex justify-center h-screen overflow-hidden pt-20 ${
          bottomButton ? "pb-20" : "pb-5"
        }`}
      >
        <div className="flex w-1/2 bg-base-300 shadow-xl rounded-xl">
          {children}
        </div>
      </div>
    </>
  );
};

export default WallContent;

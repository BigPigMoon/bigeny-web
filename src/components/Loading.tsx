import React from "react";

const Loading = () => {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    </>
  );
};

export default Loading;

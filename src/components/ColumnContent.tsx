import React, { PropsWithChildren } from "react";

const ColumnContent = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <>
      <div
        className={`scrollbar-hidden overflow-auto p-5 rounded-xl w-full space-y-5 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default ColumnContent;

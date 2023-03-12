import * as React from "react";

type FileInputProps = {
  name: string;
  setFunc: React.Dispatch<React.SetStateAction<File | null>>;
};

const FileInput = ({ name, setFunc }: FileInputProps) => {
  return (
    <>
      <span className="label label-text">{name}</span>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files) setFunc(event.target.files[0]);
        }}
        className="file-input file-input-bordered w-full max-w-xs"
      />
    </>
  );
};

export default FileInput;

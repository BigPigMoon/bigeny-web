import React, { useState } from "react";

type SendInputProps = {
  send: (
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>
  ) => void;
};

const SendInput = ({ send }: SendInputProps) => {
  const [content, setContent] = useState("");

  return (
    <>
      <div className="flex items-end w-full p-4">
        <input
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") send(content, setContent);
          }}
          placeholder="Type here"
          className="input w-full"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 m-4 cursor-pointer"
          onClick={async () => {
            send(content, setContent);
          }}
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </div>
    </>
  );
};

export default SendInput;

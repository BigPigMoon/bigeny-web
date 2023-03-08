import React from "react";

type InputProps = {
  type: string;
  name: string;
  error: boolean;
  setVar: React.Dispatch<React.SetStateAction<string>>;
};

const Input = (props: InputProps) => {
  return (
    <>
      <label className="label">
        <span className="label-text">Your {props.name}</span>
      </label>
      <input
        autoComplete={props.type === "password" ? "current-password" : "on"}
        type={props.type}
        placeholder=""
        onChange={(e) => {
          props.setVar(e.target.value);
        }}
        className={`input input-bordered w-full max-w-xs ${
          props.error && "input-error"
        }`}
      />
    </>
  );
};

export default Input;

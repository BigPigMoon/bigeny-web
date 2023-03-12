import React from "react";

type InputProps = {
  type: string;
  name: string;
  error?: boolean;
  placeholder?: string;
  disabled?: boolean;
  setVar: React.Dispatch<React.SetStateAction<string>>;
};

const Input = (props: InputProps) => {
  return (
    <>
      <label className="label">
        <span className="label-text">{props.name}</span>
      </label>
      <input
        autoComplete={props.type === "password" ? "current-password" : "on"}
        type={props.type}
        disabled={props.disabled}
        placeholder={props.placeholder}
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

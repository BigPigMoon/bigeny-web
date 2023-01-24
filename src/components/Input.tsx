import React from "react";

type InputProps = {
  type: string;
  name: string;
  setVar: React.Dispatch<React.SetStateAction<string>>;
};

const Input = (props: InputProps) => {
  return (
    <div className="relative my-3 w-64">
      <input
        type={props.type}
        className="block px-5 pb-2.5 pt-4 w-full text-sm  text-gray-50 bg-transparent rounded-2xl border-2 appearance-none border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-0 peer"
        placeholder=" "
        onChange={(e) => {
          props.setVar(e.target.value);
        }}
      />
      <label className="absolute font-bold text-sm text-gray-100 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
        {props.name}
      </label>
    </div>
  );
};

export default Input;

import React from "react";

const Action = ({ handleClick, type }) => {
  return (
    <div
      className="border-[1px] text-zinc-500 border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer"
      onClick={handleClick}
    >
      {type}
    </div>
  );
};

export default Action;

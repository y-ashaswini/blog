import React, { useState } from "react";

const WriteBox = ({ handleClick, placeholder }) => {
  const [content, setContent] = useState("");
  return (
    <>
      <textarea
        type="text"
        placeholder={placeholder}
        className="border-[1px] px-2 py-1 rounded-sm outline-none bg-transparent border-zinc-500 text-zinc-200 scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-2xl scrollbar-track-zinc-900 scrollbar-thin"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <span className="addhere100">
        <span
          className="flex items-center -gap-1 opacity-20 hover:opacity-100 cursor-pointer duration-200 ease-in"
          onClick={handleClick}
        >
          <hr className="border-[1px] w-full border-zinc-200" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-zinc-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </span>
    </>
  );
};

export default WriteBox;

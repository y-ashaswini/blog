import { userDataContext } from "../App";
import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Contactme() {
  const form = useRef();
  const { user } = useContext(userDataContext);

  function handleQuery(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <>
      <span className="md:text-5xl text-2xl text-zinc-200">
        Leave a message for me
      </span>
      <form
        ref={form}
        onSubmit={(e) => handleQuery(e)}
        className="flex flex-col space-y-4 mt-8"
      >
        <label className="text-zinc-400 pt-4 hover:text-zinc-200 duration-200 ease-in">
          Name
        </label>
        <input
          type="text"
          name="user_entername"
          className="border-b-[1px] outline-none bg-transparent border-zinc-500 text-zinc-200"
        />
        <label className="text-zinc-400 pt-4 hover:text-zinc-200 duration-200 ease-in">
          Email
        </label>
        {!user || !user.email || (user.email && user.email.trim()) === "" ? (
          <input
            type="email"
            name="user_email"
            className="border-b-[1px] outline-none bg-transparent border-zinc-500 text-zinc-200"
          />
        ) : (
          <input
            type="email"
            name="user_email"
            className="border-b-[1px] outline-none bg-transparent border-zinc-500 text-zinc-200"
            value={user.email}
          />
        )}

        <label className="text-zinc-400 hover:text-zinc-200 duration-200 ease-in pt-4">
          Message
        </label>
        <textarea
          name="user_message"
          className="border-[1px] px-2 py-1 rounded-sm outline-none bg-transparent border-zinc-500 text-zinc-200 scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-2xl scrollbar-track-zinc-900 scrollbar-thin"
        />
        <input
          type="submit"
          value="SEND"
          className="border-[1px] border-zinc-500 text-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer"
        />
      </form>
    </>
  );
}

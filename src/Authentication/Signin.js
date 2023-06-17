import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Signin() {
  const { user, setUser } = useContext(userDataContext);

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignin(e) {
    e.preventDefault();
    if (
      (email && email.trim() === "") ||
      (password && password.trim() === "")
    ) {
      console.log("Please fill up all the fields");
    } else {
      localStorage.clear();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
      }
      if (data) {
        if (data.user === null || data.session === null) {
          console.log("No such account in our database please try again");
        } else {
          console.log("signed in successfully");
          setUser(data.user);
          navigate("/");
        }
      }
    }
  }

  return (
    <>
      {!user || !user.email || (user.email && user.email.trim()) === "" ? (
        <>
          <span className="md:text-5xl text-2xl text-zinc-200">Sign in</span>
          <form className="flex flex-col space-y-8 w-3/4 sm:my-16 my-8 text-zinc-500">
            <input
              type="text"
              placeholder="Enter your email"
              className="border-b-[1px] outline-none bg-transparent border-zinc-500 text-zinc-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="border-b-[1px] outline-none bg-transparent border-zinc-500 text-zinc-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
              onClick={(e) => handleSignin(e)}
            >
              SIGN IN
            </button>
          </form>
          <span className="text-zinc-400 mr-2">Don't have an account?</span>
          <Link
            to="/sign_up"
            className="semibold text-zinc-400 hover:text-zinc-100 duration-200 ease-in"
          >
            Create one here
          </Link>
          .
        </>
      ) : (
        <>
          <div className="md:text-5xl my-4 text-2xl text-zinc-200">
            You're already Signed in.
          </div>
          <Link
            to="/"
            className="border-[1px] border-zinc-500 text-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
          >
            HOME PAGE
          </Link>
        </>
      )}
    </>
  );
}

import { createClient } from "@supabase/supabase-js";
import { userDataContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Signup() {
  const { user, setUser } = useContext(userDataContext);
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    if (email.trim() == "" || password.trim() == "") {
      console.log("Please fill up all the fields");
    } else if (confirmpass != password) {
      console.log("Your passwords don't match");
    } else {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.log("Error signing up: ", error);
      } else {
        console.log("Sign up successful");
        setUser(data.user);
        navigate("/");
      }
    }
  }

  return (
    <>
      {!user || !user.email || (user.email && user.email.trim()) === "" ? (
        <>
          <span className="md:text-5xl text-2xl text-zinc-200">Sign up</span>
          <form className="flex flex-col space-y-8 w-3/4 sm:my-16 my-8 text-zinc-500">
            <input
              type="text"
              placeholder="Enter your Email"
              className="border-b-[1px] outline-none bg-transparent border-zinc-500 text-zinc-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-b-[1px] outline-none bg-transparent border-zinc-500 text-zinc-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-b-[1px] outline-none bg-transparent border-zinc-500 text-zinc-200"
              value={password}
              onChange={(e) => setConfirmpass(e.target.value)}
            />
            <button
              className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
              onClick={(e) => handleSignup(e)}
            >
              SIGN UP
            </button>
          </form>
          <span className="text-zinc-400">
            Have an account already?
            <Link
              to="/sign_in"
              className="semibold ml-2 text-zinc-400 hover:text-zinc-100 duration-200 ease-in"
            >
              Sign in instead
            </Link>
            .
          </span>
        </>
      ) : (
        <>
          {" "}
          <div className="md:text-3xl my-2 text-lg font-bold text-zinc-200">
            You're already Signed in.
          </div>
          <Link
            to="/"
            className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
          >
            HOME PAGE
          </Link>
        </>
      )}
    </>
  );
}

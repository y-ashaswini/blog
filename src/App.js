import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { createClient } from "@supabase/supabase-js";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import Blogintro from "./Components/Blogintro";
import Blogpost from "./Components/Blogpost";
import Contactme from "./Components/Contactme";
import Mywork from "./Components/Mywork";
import Signin from "./Authentication/Signin";
import Signup from "./Authentication/Signup";
import Write from "./Components/Write";
import Dump from "./Components/Dump";
import Home from "./Components/Home";
import Panel from "./Components/Panel";

export const userDataContext = createContext();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState("");

  async function GET_CURRENT_USER() {
    const { data: userdata } = await supabase.auth.getUser();
    // console.log(userdata);
    if (userdata && userdata.user) {
      setUser(userdata.user);
    }
  }

  useEffect(() => {
    GET_CURRENT_USER();
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Sign out unsuccessful");
    } else {
      console.log("Signed out successfuly");
      setUser("");
      localStorage.clear();
    }
  }

  return (
    <userDataContext.Provider value={{ user, setUser }}>
      <div className="h-[100vh] bg-zinc-200 p-12 md:py-16 md:px-20 ">
        <Link
          to="/"
          className="flex sm:text-sm text-xs sm:gap-4 gap-2 absolute top-5 sm:left-8 left-4 verybold text-zinc-900 outline-none"
        >
          <span>YASHASWINI SHIVATHAYA</span>
          <span>/</span>
          <span>DEVELOPER</span>
        </Link>

        <div className="flex sm:text-sm text-xs gap-4 absolute sm:right-9 right-6 sm:top-64 top-48 rotate-90 origin-right verybold text-zinc-400">
          <Link
            to="/my_work"
            className="hover:text-zinc-900 tracking-wider cursor-pointer duration-300"
          >
            MY WORK
          </Link>
          <Link
            to="/blog"
            className="hover:text-zinc-900 tracking-wider cursor-pointer duration-300 outline-none"
          >
            BLOG
          </Link>
          {!user || !user.email || (user.email && user.email.trim()) === "" ? (
            <Link
              to="/sign_in"
              className="hover:text-zinc-900 tracking-wider cursor-pointer duration-300 outline-none"
            >
              SIGN IN
            </Link>
          ) : (
            <div
              onClick={handleSignOut}
              className="hover:text-zinc-900 tracking-wider cursor-pointer duration-300 outline-none"
            >
              SIGN OUT
            </div>
          )}
        </div>
        <Link
          to="/contact_me"
          className="sm:text-sm text-xs absolute bottom-5 origin-left -rotate-90 sm:left-10 left-6 verybold  text-zinc-400 hover:text-zinc-900 tracking-wider cursor-pointer duration-300 outline-none"
        >
          CONTACT ME
        </Link>
        <div className="h-full w-full bg-zinc-900 overflow-hidden rounded-xl shadow-lg shadow-zinc-400 relative">
          <span className="absolute right-4 top-4 text-slate-200 semibold">
            {window.location.pathname === "/"
              ? "WELCOME"
              : window.location.pathname
                  .split("/")[1]
                  .toUpperCase()
                  .split("_")
                  .join(" ")}
          </span>
          <span className="absolute bottom-1 left-4 text-slate-500 hover:text-slate-300 duration-200 ease-in">
            {user && user.email && user.email}
          </span>
          <div className="grid grid-cols-8 w-full h-full p-2">
            <div className="md:col-span-2 col-span-8 overflow-y-scroll scrollbar-thumb-zinc-900 scrollbar-thumb-rounded-2xl scrollbar-track-zinc-900 scrollbar-thin overflow-x-visible flex flex-col  text-zinc-500 text-4xl">
              <Panel />
            </div>
            <div className="md:col-span-6 md:col-start-3 col-start-1 col-span-8 md:px-8 px-4 py-4 text-zinc-200 overflow-y-scroll scrollbar-thumb-zinc-900 scrollbar-thumb-rounded-2xl scrollbar-track-zinc-900 scrollbar-thin">
              <Routes location={location} key={location.pathname}>
                <Route path="/" exact element={<Home />} />
                <Route path="/blog" exact element={<Blogintro />} />
                <Route path="/blog/*" exact element={<Blogpost />} />
                <Route path="/contact_me" exact element={<Contactme />} />
                <Route path="/my_work" exact element={<Mywork />} />
                <Route path="/sign_in" exact element={<Signin />} />
                <Route path="/sign_up" exact element={<Signup />} />
                <Route path="/write" exact element={<Write />} />
                <Route path="/*" exact element={<Dump />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </userDataContext.Provider>
  );
}

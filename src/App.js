import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import { createClient } from "@supabase/supabase-js";
import "react-toastify/dist/ReactToastify.css";

// const supabase = createClient(
//   process.env.REACT_APP_SUPABASE_URL,
//   process.env.REACT_APP_SUPABASE_API_ANON_KEY
// );

export default function App() {
  return (
    <div className="h-[100vh] bg-zinc-300 p-12 md:py-16 md:px-20 ">
      <div className="flex sm:text-sm text-xs sm:gap-4 gap-2 absolute top-5 sm:left-8 left-4 verybold text-zinc-800">
        <span>YASHASWINI SHIVATHAYA</span>
        <span>/</span>
        <span>DEVELOPER</span>
      </div>
      <div className="flex sm:text-sm text-xs gap-4 absolute sm:right-9 right-6 sm:top-56 top-48 rotate-90 origin-right verybold text-zinc-800">
        <span>MY WORK</span>
        <span>BLOG</span>
        <span>HOME</span>
      </div>
      <div className="sm:text-sm text-xs absolute bottom-5 origin-left -rotate-90 sm:left-10 left-6 verybold text-zinc-800">
        CONTACT ME
      </div>
      <div className="h-full w-full bg-zinc-800 rounded-xl shadow-lg shadow-zinc-400 relative">
        <span className="absolute right-4 top-4 text-slate-200 semibold">
          BLOG
        </span>
      </div>
    </div>
  );
}

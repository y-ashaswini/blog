import { useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { userDataContext } from "../App";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);
export default function Panel({showPopup}) {
  const { user } = useContext(userDataContext);
  const [postsdata, setPostsdata] = useState("");
  const [projsdata, setProjsdata] = useState("");
  const [profiledata, setProfiledata] = useState("");
  async function GET_BLOG_POSTS() {
    let { data, error } = await supabase.from("post").select("*");

    if (error) {
      console.log(error);
        showPopup("Error Fetching Posts!")
    } else {
      // console.log("data: ", data);
      setPostsdata(data);
    }
  }

  async function GET_GITHUB_PROJECTS() {
    const client_id = "b538be69eaef6f6b6559";
    const client_secret = "0f478dbe8a73c409c92c44a5d9aae98e7f4efd8d";
    const repos_count = 50;
    const repos_sort = "created: asc";
    const user = "y-ashaswini";

    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`
    );

    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${repos_count}&sort=${repos_sort}&client_id=${client_id}&client_secret=${client_secret}`
    );
    const profile = await profileResponse.json();
    const repos = await repoResponse.json();
    setProjsdata(repos);
    setProfiledata(profile);
  }

  useEffect(() => {
    GET_BLOG_POSTS();
    GET_GITHUB_PROJECTS();
  }, []);
  return (
    <>
      {window.location.pathname.split("/")[1] === "blog" &&
        (postsdata ? (
          postsdata.map((each) => (
            <Link
              to={`blog/${each.heading.split(" ").join("_")}`}
              key={each.id}
            >
              <span className="hover:text-zinc-200 cursor-pointer duration-200 ease-in">
                {each.heading.toUpperCase()}
              </span>
              <span className="ml-2 text-xs text-zinc-200 semibold w-fit">
                {moment(each.created_at).format("Do MMMM, YYYY")}
              </span>
            </Link>
          ))
        ) : (
          <span>Loading...</span>
        ))}
      <span className="flex flex-wrap">
        {window.location.pathname.split("/")[1] === "" &&
          "01111001 01101111 01110101 00100000 01110111 01101001 01101100 01101100 00100000 01101111 01101110 01101100 01111001 00100000 01101011 01101110 01101111 01110111 00100000 01110111 01101000 01100001 01110100 00100000 01111001 01101111 01110101 00100111 01110110 01100101 00100000 01100010 01100101 01100011 01101111 01101101 01100101 00101100 00100000 01100001 01110100 00100000 01110100 01101000 01100101 00100000 01110110 01100101 01110010 01111001 00100000 01100101 01101110 01100100 00101110"
            .split(" ")
            .map((item, index) => (
              <span
                key={index}
                className="md:text-2xl md:block hidden break-words text-zinc-600 hover:text-zinc-200 duration-500 hover:ease-in-out"
              >
                {item}
              </span>
            ))}
      </span>
      {window.location.pathname.split("/")[1] === "my_work" &&
        projsdata &&
        projsdata.map((item, index) => (
          <a
            target="_blank"
            href={`https://github.com/${item.full_name}`}
            key={index}
          >
            <span className="hover:text-zinc-200 cursor-pointer duration-200 ease-in">
              {item.name.toUpperCase()}
            </span>
            {/* <span className="ml-2 text-xs text-zinc-200 semibold w-fit">
              {item.full_name}
            </span> */}
          </a>
        ))}
      {window.location.pathname.split("/")[1] === "contact_me" && (
        <span className="flex md:flex-col justify-around items-center gap-4 h-full mx-auto md:text-2xl text-lg">
          <a
            href="https://github.com/y-ashaswini"
            target="_blank"
            className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/yashaswini-shivathaya"
            target="_blank"
            className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
          >
            LINKEDIN
          </a>
          <a
            href="https://medium.com/@evilgeniusprevails"
            target="_blank"
            className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
          >
            MEDIUM
          </a>
          <a
            href="https://tinyurl.com/yashaswini-shivathaya"
            target="_blank"
            className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
          >
            RESUME
          </a>
          <a
            href="https://tinyurl.com/yashaswini-design"
            target="_blank"
            className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
          >
            DESIGN
          </a>
        </span>
      )}

      {window.location.pathname.split("/")[1] === "blog" &&
      user.email === process.env.REACT_APP_MAIL ? (
        <Link
          to="/write"
          className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
        >
          WRITE
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}

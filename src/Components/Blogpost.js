import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useContext } from "react";
import { userDataContext } from "../App";
import moment from "moment/moment";
import Comment from "./Comment";
import useNode from "../Hooks/useNode";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Blogpost() {
  const { user } = useContext(userDataContext);

  const [blogdata, setBlogdata] = useState("");
  const [first_content, set_first_content] = useState("");
  const [main_content, set_main_content] = useState("");
  const [end_content, set_end_content] = useState("");
  const [liked_by_curr_user, setLiked_by_curr_user] = useState(false);
  const [parsed_likes_list, setParsed_likes_list] = useState("");
  const [showComments, setShowComments] = useState(false);

  const [commentsData, setCommentsData] = useState("");
  const { insertNode, deleteNode } = useNode();

  async function GET_BLOG(heading) {
    // console.log("heading: ", heading);
    let { data, error } = await supabase
      .from("post")
      .select("*")
      .eq("heading", heading);

    if (error) {
      console.log("error: ", error);
    } else {
      // console.log("data: ", data);
      setBlogdata(data[0]);
      data[0].first_content &&
        set_first_content(JSON.parse(data[0].first_content));
      data[0].main_content &&
        set_main_content(JSON.parse(data[0].main_content));
      set_end_content(data[0].end_content);
      let f = JSON.parse(data[0].likes);
      setParsed_likes_list(f);
      setCommentsData(JSON.parse(data[0].comments));
      for (let i = 0; i < f.length; i++) {
        if (parsed_likes_list[i] == user.id) {
          setLiked_by_curr_user(true);
          break;
        }
      }
    }
  }

  async function setLike() {
    if (!user || !user.email || (user.email && user.email.trim()) === "") {
      console.log("login to like/ dislike!");
    } else {
      setLiked_by_curr_user(true);
      parsed_likes_list.push(user.id);
      setParsed_likes_list(parsed_likes_list);
      const { data, error } = await supabase
        .from("post")
        .update({ likes: JSON.stringify(parsed_likes_list) })
        .eq("id", blogdata.id);
      if (error) console.log("liking error: ", error);
    }
  }

  async function setDislike() {
    if (!user || !user.email || (user.email && user.email.trim()) === "") {
      console.log("login to like/ dislike!");
    } else {
      setLiked_by_curr_user(false);
      const temp = parsed_likes_list.filter((each) => each != user.id);
      setParsed_likes_list(temp);
      const { data, error } = await supabase
        .from("post")
        .update({ likes_list: JSON.stringify(parsed_likes_list) })
        .eq("id", blogdata.id);
      if (error) console.log("disliking error: ", error);
    }
  }

  const handleInsertNode = async (folderId, item, userid, useremail) => {
    const temp = insertNode(commentsData, folderId, item, userid, useremail);
    await afterAddComment(temp);
    setCommentsData(temp);
  };

  const handleDeleteNode = async (folderId, userid) => {
    const finalStructure = deleteNode(commentsData, folderId, userid);
    const temp = { ...finalStructure };
    await afterAddComment(temp);
    setCommentsData(temp);
  };

  async function afterAddComment(temp) {
    const { data: d, error } = await supabase
      .from("post")
      .update({ comments: temp })
      .eq("id", blogdata.id);
    if (error) {
      console.log("Couldn't add comment: ", error);
    }
  }

  useEffect(() => {
    GET_BLOG(
      window.location.pathname.split("/").slice(-1)[0].split("_").join(" ")
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 mb-12 mt-4">
      <span className="absolute right-7 top-16 verybold flex flex-col text-center gap-1 z-30 text-red-600">
        {parsed_likes_list.length}
        {liked_by_curr_user ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setDislike()}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setLike()}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        )}
      </span>
      {blogdata ? (
        <>
          <span className="md:text-[10vh] text-5xl">{blogdata.heading}</span>
          <span className="text-zinc-500 hover:text-zinc-200 text-sm -mt-2 duration-200 ease-in">
            {moment(blogdata.created_at).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
          {first_content &&
            first_content.map((each) => (
              <div
                key={each}
                className="text-3xl italic sm:text-zinc-400 text-zinc-200 hover:text-zinc-100 duration-200 ease-in"
              >
                {each}
              </div>
            ))}
          {main_content &&
            main_content.map((each) => (
              <div
                className="semibold sm:text-zinc-400 text-zinc-200 hover:text-zinc-100 duration-200 ease-in"
                key={each}
              >
                {each}
              </div>
            ))}
          {end_content && (
            <div className="text-3xl semibold sm:text-zinc-400 hover:text-zinc-100 text-zinc-200 duration-200 ease-in">
              {end_content}
            </div>
          )}
          <div
            className="border-[1px] text-zinc-500 border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200 cursor-pointer text-sm"
            onClick={() => setShowComments((curr) => !curr)}
          >
            {!showComments
              ? commentsData.items.length !== 0
                ? "SHOW " + commentsData.items.length + " COMMENT(S)"
                : "BE THE FIRST TO COMMENT!"
              : "HIDE COMMENT(S)"}
          </div>

          {/* Display Comments Section */}
          {showComments && (
            <Comment
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              comment={commentsData}
            />
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

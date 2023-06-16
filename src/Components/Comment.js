import { useState, useContext } from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "../Assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../Assets/up-arrow.svg";
import { userDataContext } from "../App";
import moment from "moment/moment";

const Comment = ({ handleInsertNode, handleDeleteNode, comment }) => {
  const { user } = useContext(userDataContext);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(true);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    setExpand(true);
    handleInsertNode(comment.id, input, user.id, user.email);
    setShowInput(false);
    setInput("");
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id, user.id);
  };

  return (
    <div>
      <div
        className={
          comment.id === 1
            ? "flex gap-2 my-2 items-center flex-col text-left"
            : "border-l-[1px] my-2 sm:pl-2 pl-1 border-zinc-500 flex flex-col gap-2"
        }
      >
        {comment.id === 1 ? (
          <>
            {!user ||
            !user.email ||
            (user.email && user.email.trim()) === "" ? (
              <span className="text-left text-2xl mb-2 text-zinc-200 ">
                SIGN IN TO COMMENT.
              </span>
            ) : (
              <form className="text-sm flex flex-col lg:flex-row items-start gap-2 w-full lg:items-center">
                <span className="flex items-center gap-2 text-xs font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 bg-zinc-700 text-zinc-200 rounded-full p-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span className="text-zinc-400 semibold">
                    {user.email + " (You)"}
                  </span>
                </span>
                <input
                  type="text"
                  placeholder="Comment Here"
                  className="text-white break-words bg-transparent border-b-[1px] border-zinc-500 flex-1 w-full lg:w-96 outline-none px-2 py-1"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Action type="COMMENT" handleClick={onAddComment} />
              </form>
            )}
          </>
        ) : (
          <>
            <span className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 bg-zinc-700 text-zinc-200 rounded-full p-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="text-zinc-400 semibold text-xs">
                {comment.useremail}
              </span>
            </span>
            <span className="flex flex-wrap text-sm gap-2 items-center justify-between px-2 py-1">
              <span className="semibold text-zinc-100">{comment.name}</span>

              {!user ||
              !user.email ||
              (user.email && user.email.trim()) === "" ? (
                <></>
              ) : (
                <span className="flex gap-2 items-center">
                  <Action
                    type={
                      <span className="flex items-center gap-1">
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}
                        REPLY
                      </span>
                    }
                    handleClick={handleNewComment}
                  />

                  {comment.userid === user.id ? (
                    <Action type="DELETE" handleClick={handleDelete} />
                  ) : (
                    <></>
                  )}
                </span>
              )}
            </span>
            <span className="flex flex-wrap text-[10px] text-yellow1 justify-between">
              <span>
                {moment(comment.time).format("MMMM Do YYYY, h:mm:ss a")}
              </span>
              <span>{comment.items.length + " comments underneath"}</span>
            </span>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="my-2 pl-1 sm:pl-2 border-l-2 flex flex-col gap-2 border-blue1">
            <span className="flex items-center gap-2 text-xs font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 bg-zinc-700 text-zinc-200 rounded-full p-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="text-zinc-400 semibold">
                {user.email + " (You)"}
              </span>
            </span>
            <form className="text-sm flex flex-col lg:flex-row items-start lg:items-center gap-2 w-full flex-1">
              <input
                type="text"
                placeholder="Comment Here"
                className="text-white break-words bg-transparent border-b-[1px] border-zinc-500 flex-1 w-full lg:w-96 outline-none rounded-sm px-2 py-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {!user ||
              !user.email ||
              (user.email && user.email.trim()) === "" ? (
                <></>
              ) : (
                <span className="flex items-center gap-2">
                  <Action type="REPLY" handleClick={onAddComment} />
                  <Action
                    type="CANCEL"
                    handleClick={() => {
                      setShowInput(false);
                      setInput("");
                      if (!comment?.items?.length) setExpand(false);
                    }}
                  />
                </span>
              )}
            </form>
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;

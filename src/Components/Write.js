import { useContext, useState } from "react";
import { userDataContext } from "../App";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_API_ANON_KEY
);

export default function Write({ showPopup }) {
    const { user } = useContext(userDataContext);
    const [heading, setHeading] = useState("");
    const [first_content, set_first_content] = useState([{ content: "" }]);
    const [main_content, set_main_content] = useState([{ content: "" }]);
    const [end_content, set_end_content] = useState("");
    //   Not adding any tags for now

    async function INSERT_BLOG(e) {
        e.preventDefault();
        let l = [];
        first_content.map((f) => l.push(f.content));
        let m = [];
        main_content.map((f) => m.push(f.content));

        const { data, error } = await supabase
            .from("post")
            .insert([
                {
                    heading: heading,
                    first_content: l,
                    main_content: m,
                    end_content: end_content,
                },
            ])
            .select();
        if (error) {
            console.log(error);
            showPopup("Error Posting!")
        }
        else {
            // console.log("inserted data: ", data);
            showPopup("Posted Successfully!")
        }
        window.location.reload();
    }

    const handleAdd = (type) => {
        if (type === "first") {
            set_first_content([...first_content, { content: "" }]);
        } else if (type === "main") {
            set_main_content([...main_content, { content: "" }]);
        }
    };

    const handleRemove = (index, type) => {
        if (type === "first") {
            const l = [...first_content];
            l.splice(index, 1);
            set_first_content(l);
        } else if (type === "main") {
            const l = [...main_content];
            l.splice(index, 1);
            set_main_content(l);
        }
    };

    const handleChange = (index, type, e) => {
        const v = e.target.value;
        if (type === "first") {
            const l = [...first_content];
            l[index]["content"] = v;
            set_first_content(l);
        } else if (type === "main") {
            const l = [...main_content];
            l[index]["content"] = v;
            set_main_content(l);
        }
    };

    return (
        <>
            {!user || !user.email || (user.email && user.email.trim()) === "" ? (
                <>
                    <div className="md:text-5xl my-4 text-2xl text-zinc-200">
                        Sorry, you're not signed in!
                    </div>
                    <Link
                        to="/sign_in"
                        className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
                    >
                        SIGN IN
                    </Link>
                </>
            ) : user.email !== process.env.REACT_APP_MAIL ? (
                <>
                    <div className="md:text-5xl my-4 text-2xl text-zinc-200">
                        Imposter! You don't quite look like the admin.
                    </div>
                    <Link
                        to="/"
                        className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
                    >
                        HOME PAGE
                    </Link>
                </>
            ) : (
                <form className="flex flex-col space-y-4 w-3/4 sm:my-16 my-8 text-zinc-500">
                    <span className="md:text-5xl text-2xl text-zinc-200">Heading</span>
                    <input
                        type="text"
                        placeholder="Heading"
                        className="border-b-[1px] px-2 py-1 outline-none bg-transparent border-zinc-500 text-zinc-200"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                    />
                    <span className="md:text-5xl text-2xl text-zinc-200 pt-4">
                        Introduction
                    </span>
                    {first_content.map((thing, index) => (
                        <span className="relative flex flex-col flex-1">
                            {index !== 0 && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 absolute top-4 -right-16 hover:text-zinc-200 duration-200 ease-in cursor-pointer"
                                    onClick={() => handleRemove(index, "first")}
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            )}
                            <textarea
                                key={index}
                                type="text"
                                placeholder="First Paragraph Content"
                                className="border-[1px] px-2 py-1 rounded-sm outline-none bg-transparent border-zinc-500 text-zinc-200 scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-2xl scrollbar-track-zinc-900 scrollbar-thin"
                                value={thing.content}
                                onChange={(e) => handleChange(index, "first", e)}
                            />
                            {first_content.length - 1 === index && (
                                <span
                                    className="flex items-center -gap-1 opacity-20 hover:opacity-100 cursor-pointer duration-200 ease-in my-2"
                                    onClick={() => handleAdd("first")}
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
                            )}
                        </span>
                    ))}
                    <span className="md:text-5xl text-2xl text-zinc-200 mt-4">
                        Main Content
                    </span>
                    {main_content.map((thing, index) => (
                        <span className="relative flex flex-col flex-1">
                            {index !== 0 && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 absolute top-4 -right-16 hover:text-zinc-200 duration-200 ease-in cursor-pointer"
                                    onClick={() => handleRemove(index, "main")}
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            )}
                            <textarea
                                key={index}
                                type="text"
                                placeholder="Main Paragraph Content"
                                className="border-[1px] px-2 py-1 rounded-sm outline-none bg-transparent border-zinc-500 text-zinc-200 scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-2xl scrollbar-track-zinc-900 scrollbar-thin"
                                value={thing.content}
                                onChange={(e) => handleChange(index, "main", e)}
                            />
                            {main_content.length - 1 === index && (
                                <span
                                    className="flex items-center -gap-1 opacity-20 hover:opacity-100 cursor-pointer duration-200 ease-in my-2"
                                    onClick={() => handleAdd("main")}
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
                            )}
                        </span>
                    ))}

                    <span className="md:text-5xl text-2xl text-zinc-200 pt-4">
                        Conclusion
                    </span>

                    <textarea
                        type="text"
                        placeholder="Closing Lines"
                        className="border-[1px] px-2 py-1 rounded-sm outline-none bg-transparent border-zinc-500 text-zinc-200 scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-2xl scrollbar-track-zinc-900 scrollbar-thin"
                        value={end_content}
                        onChange={(e) => set_end_content(e.target.value)}
                    />

                    <button
                        className="border-[1px] border-zinc-500 hover:border-zinc-200 duration-200 ease-in w-fit px-2 py-1 rounded-sm hover:text-zinc-200"
                        onClick={(e) => INSERT_BLOG(e)}
                    >
                        POST
                    </button>
                </form>
            )}
        </>
    );
}

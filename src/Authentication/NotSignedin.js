import { useNavigate } from "react-router-dom";
export default function NotSignedin() {
  let navigate = useNavigate();
  return (
    <>
      <div className="md:text-3xl text-lg font-bold text-blue1">
        You're Signed Out.
      </div>
      <button
        type="button"
        onClick={() => navigate("/signin")}
        className="bg-blue2 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer border-2 border-blue1 border-r-4 border-b-4 outline-none w-fit my-2"
      >
        GO TO SIGN IN PAGE
      </button>
    </>
  );
}

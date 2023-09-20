"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Feed = () => {
  const [fortuneLists, setFortuneLists] = useState([
    "A great fortune is a great servitude.",
    "It is not Justice the servant of men, but accident, hazard, Fortune-the ally of patient Time-that holds an even and scrupulous balance.",
    "Whatever may happen, every kind of fortune is to be overcome by bearing it.",
    "The tallest trees are most in the power of the winds, and ambitious men of the blasts of fortune.",
    "There is a tide in the affairs of men, which, taken at the flood, leads on to fortune; omitted, all the voyage of their life is bound in shallows and in miseries.",
  ]);
  const [fortune, setFortune] = useState("");
  const [newFortune, setnewFortune] = useState("");
  const [loading, setLoading] = useState(false);
  const rollFortune = async () => {
    setLoading(true);
    const res = fortuneLists[Math.floor(Math.random() * fortuneLists.length)];
    setFortune(res);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  };

  useEffect(() => {
    rollFortune();
  }, []);

  return (
    <section className="feed">
      <div className="bg-white w-full flex-center shadow-2xl rounded-lg p-4">
        {loading ? <p>Shuffling fortune ... </p> : <p>{fortune}</p>}
      </div>
      <div>
        <button
          onClick={(e) => rollFortune()}
          className={`mt-4 px-5 py-1.5 text-sm  rounded-lg text-white hover:cursor-pointer font-bold  purple_gradient-bg ${
            loading ? "disabled bg-gray-300" : ""
          }`}
        >
          Shuffle
        </button>
      </div>
      <div className="flex gap-2 my-20">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Add awesome fortune"
            onChange={(e) => {
              setnewFortune(e.target.value);
            }}
            required
            className="search_input peer"
          />
        </form>
        <button
          onClick={() => {
            try {
              setFortuneLists([...fortuneLists, newFortune]);
              toast.success("Successfully toasted!");
            } catch (error) {}
          }}
          className="rounded-lg  border border-yellow-600 text-yellow-600 bg-transparent py-1.5 px-5 transition-all hover:border-yellow-400 hover:text-black hover:bg-yellow-400 text-center text-sm font-inter flex items-center justify-center"
        >
          add
        </button>
      </div>
    </section>
  );
};

export default Feed;

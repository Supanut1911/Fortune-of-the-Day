"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Feed = () => {
  const [fortuneLists, setFortuneLists] = useState([
    "A great fortune is a great servitude.",
    "It is not Justice the servant of men, but accident, hazard, Fortune-the ally of patient Time-that holds an even and scrupulous balance.",
    "Whatever may happen, every kind of fortune is to be overcome by bearing it.",
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
          className={`mt-4 px-5 py-1.5 text-sm bg-primary-orange rounded-lg text-white hover:cursor-pointer font-bold ${
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
            placeholder="Search for a tag or a username"
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
          className="rounded-lg  border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center"
        >
          add
        </button>
      </div>
    </section>
  );
};

export default Feed;

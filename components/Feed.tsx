"use client";

import { useEffect, useState } from "react";

const Feed = () => {
  const fortunes = [
    "A great fortune is a great servitude.",
    "It is not Justice the servant of men, but accident, hazard, Fortune-the ally of patient Time-that holds an even and scrupulous balance.",
    "Whatever may happen, every kind of fortune is to be overcome by bearing it.",
  ];
  const [fortune, setFortune] = useState("");
  const [loading, setLoading] = useState(false);
  const rollFortune = async () => {
    setLoading(true);
    const res = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(res);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  };

  useEffect(() => {
    rollFortune();
  }, []);

  return (
    <section className="feed">
      <div className="relative w-full flex-center shadow-xl rounded-l p-4 h-20">
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
    </section>
  );
};

export default Feed;

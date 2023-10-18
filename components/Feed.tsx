"use client";

import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { data } from "autoprefixer";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ddbDocClient } from "../config/ddbDocClient";
import { ddbClient } from "../config/dbconfig";
import { resolve } from "path";

interface FortuneQouteType {
  id: Stype;
  qoute: Stype;
  author: Stype;
}

interface Stype {
  S: string;
}

const Feed = () => {
  const [fortuneLists, setFortuneLists] = useState<any[]>([]);
  const [fortune, setFortune] = useState<FortuneQouteType>();
  const [newFortune, setnewFortune] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scanTable();
  }, []);

  const scanTable = async () => {
    try {
      const data = await ddbDocClient.send(
        new ScanCommand({ TableName: "fortune-qoute" })
      );
      setFortuneLists(data.Items!);
      await rollFortune();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const rollFortune = async () => {
    setLoading(true);
    console.log("fortuneLists.length>", fortuneLists.length);
    const res = fortuneLists[Math.floor(Math.random() * fortuneLists.length)];
    setFortune(res);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  };

  return (
    <section className="feed">
      <div className="bg-white w-full flex-center shadow-2xl rounded-lg p-4">
        {loading ? <p>Shuffling fortune ... </p> : <p>{fortune?.qoute.S}</p>}
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

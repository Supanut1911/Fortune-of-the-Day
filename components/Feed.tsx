"use client";

import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ddbDocClient } from "../config/ddbDocClient";
import { ScanCommandOutput } from "@aws-sdk/lib-dynamodb";

// Define a type for DynamoDB AttributeValue
type DynamoDBAttributeValue = {
  S?: string; // String
  N?: string; // Number
  B?: string; // Binary
  SS?: string[]; // String Set
  NS?: string[]; // Number Set
  BS?: string[]; // Binary Set
  BOOL?: boolean; // Boolean
  NULL?: boolean; // Null
  M?: Record<string, DynamoDBAttributeValue>; // Map
  L?: DynamoDBAttributeValue[]; // List
};

// Define a type for a single item
type DynamoDBItem = Record<string, DynamoDBAttributeValue>;

const Feed = () => {
  const [fortuneLists, setFortuneLists] = useState<DynamoDBItem[] | undefined>(
    undefined
  );
  const [fortune, setFortune] = useState<any>();
  const [newFortune, setnewFortune] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scanTable();
  }, []);

  const scanTable = async () => {
    try {
      setLoading(true);
      const data: ScanCommandOutput = await ddbDocClient.send(
        new ScanCommand({ TableName: "fortune-qoute" })
      );
      setFortuneLists(data.Items!);
      if (data) {
        const idx = Math.floor(Math.random() * data.Items!.length);
        const rand = data.Items![idx];
        setFortune(rand);
      }
      await new Promise((r) => setTimeout(r, 2000));
      setLoading(false);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const rollFortune = async () => {
    setLoading(true);
    if (fortuneLists) {
      const idx = Math.floor(Math.random() * fortuneLists.length);
      const rand = fortuneLists[idx];
      setFortune(rand);
    }
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
  };

  return (
    <section className="feed">
      {
        <div className="bg-white w-full flex-center shadow-2xl rounded-lg p-4">
          {loading ? <>Shuffle...</> : fortune?.qoute.S}
        </div>
      }

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

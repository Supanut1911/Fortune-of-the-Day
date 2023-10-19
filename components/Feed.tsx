"use client";
import { uuid } from "uuidv4";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ddbDocClient } from "../config/ddbDocClient";
import { PutCommand, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import Image from "next/image";

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
  const [author, setAuthor] = useState("");
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

  const createQoute = async (author: string, qoute: string) => {
    try {
      const command = new PutCommand({
        TableName: "fortune-qoute",
        Item: {
          id: uuid(),
          author,
          qoute,
        },
      });
      await new Promise((r) => setTimeout(r, 2000));
      await ddbDocClient.send(command);
      window.location.reload();
    } catch (error) {}
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
      <div>
        <Image
          src="https://tmp-bck-space.s3.ap-southeast-1.amazonaws.com/rider-waite-tarot-cards-activity-arcana-birthday-gifts-friends-herthem-969.webp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkYwRAIgZ7fzc0qeBjGnPEIAm0EHw2VNvUJepkZqrk4NpielFJYCIBey3FB6SLF4XbDG8f1asOVp2kLeZMT63H%2ByoTcKv31%2BKo4DCLj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMjI2MjE0NTc4OTEyIgw4CPrOxBD1vd%2F%2BzDIq4gIy%2FmZcZRKPeegu1mvrH%2FyCMH%2F7hsBEuVObCt%2BLW1P787iFTuILkOd%2BU0bCRcmxbx4dYTvGH6xou65bQvyJHXkoCjaFNTuQ59IGJRLOjk%2FJsb8wpXU58HeCUTprS0hHEqz8%2FlyIaqGBcKajE7dwmaOrFcn0ffhdT5E3TsDqGP5K2mMHk9wUuWrAtLwQhi%2BxJkxyZx78svl6bRpJ%2BQENm%2FQrT1PYKr2Rf5zLSL97ut%2FDJKWnpYVhQxxnRrE5JmwLYIsRSCByGkPWNey3ue92EOQe35EuBuRtG%2FeUZksleXu2UaG6cfjqcmUeABz4MB7WYC69lxD69%2FRCNIj0jTJjTgMi618rSQsnqjRMc8nUKkmvCwgAKU0ofwi0i3utEdEfQwaEzjt%2F1GTSC2wpHdv%2BEtJdKcca6rk44yRFK4LlU7qOageRBTADr0t3rtREr7YPgdzDoRi40xlB3cvYd41IKYBiqEUwv6TDqQY6tAKwthBGJXxjPHPWE1la2b6m8VKR3cN4DxLd2JqLa1IWOd%2F%2FM1MeyqW%2B42O3vpd1d7iYDV6flisOUQUfGvR4qEheu4xfF1Uui%2BiIgBKqdUD7yhJio%2BXglJg4rBNyNi421fdNK92FHyR%2FEPz08C%2FDTNzPFx6Im7VtT%2FamGpcuKzempT0ygvRpUuejZ2isEhPR38Ck42j%2Bn712tu2ohCDksB5QzSDlYIyIm3HOHCjlAiJrfgd8PTwDjES4wnmCu2DsTLjDGBwCe9vpGGQJW5eyFiBVEtn%2B%2FuM6UrykOBqwT5SFSktnm%2BIVUDMTjP3Ld%2B8Ykl724F8xFqqT2kpT%2FmTirf5OmbUvybWy8Yrah2FZrNPZsxoQWIDb%2BpT9TTVb41pa6i1QpEVpCvBtP3U4rMdn59gT4Zew%2Fw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231019T072210Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATJK3QRLQBLZY7NW6%2F20231019%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=aa17f9db000e1487854b3b1fb0f5044b0778067b837939fc00d014053ff71a08"
          width={300}
          height={300}
          alt="tmp"
        />
      </div>
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
            placeholder="Author qoute ... "
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            required
            className="search_input peer"
          />
        </form>
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Fortune qoute ..."
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
              createQoute(author, newFortune);
              toast.success("Successfully toasted!");
            } catch (error) {}
          }}
          className="rounded-lg font-bold border border-yellow-600 text-yellow-600 bg-transparent py-1.5 px-5 transition-all hover:border-yellow-600 hover:text-white hover:bg-yellow-600 text-center text-sm font-inter flex items-center justify-center"
        >
          Add
        </button>
      </div>
    </section>
  );
};

export default Feed;

import Feed from "@components/Feed";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Fourtune of the day",
  description: "Discover & share ai prompt",
};

export default function Home() {
  return (
    <section className="w-full flex flex-col items-center justify-center h-screen">
      <h1 className="head_text text-center ">
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Fortune Of The Day</span>
      </h1>
      <Feed />
      <Toaster position="top-right" />
    </section>
  );
}

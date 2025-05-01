import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

function page() {
  return (
    <div className="space-y-10">
      <p className="mt-20 font-bold text-center text-7xl">
        Introducing Chat AI
      </p>
      <div className="flex justify-center space-x-3">
        <section className="px-[2px] py-[3px] border border-[rgba(51,51,51,255)] rounded-4xl">
          <p className="flex items-center px-3 py-1   bg-[rgba(51,51,51,255)] rounded-4xl font-bold">
            <Link href="/chat">Try Now.</Link>
            <FiArrowUpRight />
          </p>
        </section>
        <section className="px-[2px] py-[3px] rounded-4xl">
          <p className="flex items-center py-1">
            Download the app
            <IoIosArrowForward />
          </p>
        </section>
        <section className="px-[2px] py-[3px] rounded-4xl">
          <p className="flex items-center py-1">
            Learn about Chat AI
            <IoIosArrowForward />
          </p>
        </section>
      </div>
    </div>
  );
}

export default page;

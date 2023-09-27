"use client";
import Image from "next/image";
import React, { useState } from "react";
import arrow from "@/Assets/arrow.png";

function FAQ({ children, title }) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="flex gap-4 py-3 text-2xl border-b-2 justify-between lg:w-1/2 text-center border-[rgba(0,0,0,.7)]"
        onClick={() => setActive((prev) => !prev)}
      >
        {title}

        <Image
          width={30}
          src={arrow}
          className={`${active ? "-rotate-90" : "rotate-90"}`}
          alt="arrow"
        />
      </button>
      <div>{active && children}</div>
    </div>
  );
}

export default FAQ;

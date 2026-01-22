"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CustomBackground from "@/components/background";
import SplitText from "./../components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import Image from "next/image";

export default function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <CustomBackground>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Ethan's Website</h1>
          {/* <SplitText
            text="Ethan's Website"
            className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl"
            // delay={100}
            // duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={() => console.log("Animation Complete")}
          /> */}
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Check out my projects, learn more about me, and get in touch!
            <br />
            Current Time: {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}:
            {time.getSeconds().toString().padStart(2, '0')} on {time.getDate().toString().padStart(2, '0')}/{(time.getMonth() + 1).toString().padStart(2, '0')}/
            {time.getFullYear()} in GMT
            {time.getTimezoneOffset() / -60 >= 0
              ? `+${time.getTimezoneOffset() / -60}`
              : time.getTimezoneOffset() / -60}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/projects"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Projects
            </Link>
            <Link href="/about" className="text-sm/6 font-semibold text-white">
              About me <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </CustomBackground>
  );
}

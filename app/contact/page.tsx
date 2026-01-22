"use client";

import { useState } from "react";
import Link from "next/link";
import CustomBackground from "@/components/background";
import SplitText from "./../../components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";

export default function Home() {
  return (
    <CustomBackground>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <SplitText
            text="Contact Me"
            className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={() => console.log("Animation Complete")}
          />
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            If you'd like to get in touch, feel free to reach out via email at{" "}
            <a
              href="mailto:ethan3141592@gmail.com"
              className="text-indigo-400 hover:text-indigo-300"
            >
              ethan3141592@gmail.com
            </a>{" "}
            or reach out through my social media channels such as discord
            (@gen0x) or instagram{" "}
            <a
              href="https://www.instagram.com/ethanc6538/"
              className="text-indigo-400 hover:text-indigo-300"
            >
              (@ethanc6538)
            </a>
            . I'm always open to discussing new opportunities, collaborations,
            or just to say hello!
          </p>
          <div className="mt-20"></div>
        </div>
      </div>
    </CustomBackground>
  );
}

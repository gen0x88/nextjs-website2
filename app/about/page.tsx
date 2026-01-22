"use client";

import { useState } from "react";
import Link from "next/link";
import CustomBackground from "@/components/background";

export default function Home() {
  return (
    <CustomBackground>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            About me
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Check out my projects, learn more about me, and get in touch!
          </p>
          <div className="mt-10 flex items-center justify-center">
            <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
              Hi there my name is Ethan and I am a software developer. I have experience in
              building web applications, mobile applications, and games. I am passionate about
              learning new technologies and improving my skills. Feel free to explore my website
              to learn more about me and my projects!
            </p>
          </div>
        </div>
      </div>
    </CustomBackground>
  );
}

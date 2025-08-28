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
            Ethan's Website
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Check out my projects, learn more about me, and get in touch!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Scroll Down
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

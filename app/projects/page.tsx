"use client";

import { useState } from "react";
import Link from "next/link";
import CustomBackground from "@/components/background";
import SplitText from "./../../components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedContent from "@/components/AnimatedContent";

export default function Projects() {
    const projects = [
    {
      title: "Emoji-Match Memory-Game",
      description:
        "This is a project that I worked on during high school. It is a fun memory game that uses emojis as the main theme.",
      link: "https://github.com/gen0x88/Emoji-Match---Memory-Game",
      picture: "../lib/emoji-match.png",
    },
    {
      title: "Balloon Adventures",
      description:
        "This is a project that I worked on during high school. It is a 2D side-scrolling game where the player controls a balloon and must navigate through various obstacles.",
      link: "https://github.com/gen0x88/BalloonAdventures",
      picture: "../lib/balloon-adventures.png",
    },
    // Add more projects as needed
  ];
  return (
    <CustomBackground>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <SplitText
            text="My Projects"
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
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >
          <div className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            alot of textalot of textalot of textalot of textalot of textalot of
            textalot of textalot of textalot of textalot of textalot of text
          </div>
        </ScrollReveal>
        <div className="mt-20">
            {/* Make a card that has a title body and an image */}
            {projects.map((project, index) => (
              <div key={index} className="mb-10">
                <AnimatedContent>
                  <div className="bg-white/10 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                      {project.title}
                    </h2>
                    <p className="text-gray-300">{project.description}</p>
                    <div className="mt-4">
                      <Link
                        href={project.link}
                        className="text-sm/6 font-semibold text-white"
                      >
                        {/* Display the project image */}
                        {/* <Image
                          src={project.picture}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <img
                          src={project.picture}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        /> */}
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            ))}
          </div>
      </div>
    </CustomBackground>
  );
}

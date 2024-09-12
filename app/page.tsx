"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { FlipWords } from "@/components/ui/flip-words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { PostrootWords, rootWords, words } from "@/constant/hero-texts";
import Image from "next/image";
import { LogoImage } from "./_components/images/images";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="w-full flex flex-col md:flex-row items-center md:items-start text-center bg-black">
        <Image src={LogoImage} alt={'logo'} height={200} width={200} style={{ objectFit: 'contain', padding: '50px' }} />
      </div>
      <section className="relative w-full overflow-x-hidden flex flex-col items-center">
        <WavyBackground className="max-w-4xl mx-auto pb-40 -top-24 flex flex-col items-center md:items-start">
          <TypewriterEffectSmooth words={rootWords} />
          <div className="flex flex-row items-center justify-center">
            <TypewriterEffectSmooth words={PostrootWords} />
            <FlipWords
              className="text-3xl md:text-3xl lg:text-7xl text-cyan-300 font-bold"
              words={words}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-10">
          <Link 
          href={"/home"}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Get Started
            </span>
          </Link>
          </div>
        </WavyBackground>
      </section>
      {/* <section className="w-full text-center">
        Footer
      </section> */}
    </div>
  );
};

export default LandingPage;

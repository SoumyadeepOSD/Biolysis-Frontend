/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/input";
import React from "react";
import {
    LucideBotMessageSquare,
    LinkedinIcon,
    FacebookIcon,
    TwitterIcon,
    YoutubeIcon,
    GithubIcon,
    MailIcon,
  } from "lucide-react";
  
  const socialConnects = [
    {
      id: 1,
      name: "Github",
      link:"https://www.github.com/SoumyadeepOSD",
      icon: (props:any) => <GithubIcon {...props} />,
    },
    {
      id: 2,
      name: "Linkedin",
      link:"https://www.linkedin.com/in/soumyadeep-das-bhowmick-01a882234",
      icon: (props:any) => <LinkedinIcon {...props} />,
    },
    {
      id: 3,
      name: "Gmail",
      link:"",
      icon: (props:any) => <MailIcon {...props} />,
    },
    {
      id: 4,
      name: "Twitter",
      link:"https://x.com/SoumyadeepDasB6",
      icon: (props:any) => <TwitterIcon {...props} />,
    },
    {
      id: 5,
      name: "Facebook",
      link:"https://www.facebook.com/soumyadeep.dasbhowmick.79",
      icon: (props:any) => <FacebookIcon {...props} />,
    },
    {
      id: 6,
      name: "YouTube",
      link:"https://www.youtube.com/@Open-Container",
      icon: (props:any) => <YoutubeIcon {...props} />,
    },
  ];
  
  const Contact = () => {
    return (
      <div className="grid grid-cols-2 items-start justify-between h-screen w-full bg-slate-50 p-20">
        <div className="grid grid-rows-2 items-start justify-center">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-cyan-500 font-semibold text-5xl">Let&apos;s Talk!</h1>
            <h2 className="text-slate-700 text-sm font-normal">
              I&apos;d love to hear from you.
            </h2>
          </div>
          <div className="bg-blue-950 rounded-full h-32 w-32 flex flex-col items-center justify-center">
            <LucideBotMessageSquare
              color="#06b6d4"
              height={50}
              width={50}
              className="animate-bounce"
            />
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 items-start justify-center mt-10">
            {socialConnects.map((social) => (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                className="flex flex-row items-center gap-2 border-[2px] border-cyan-700 rounded-lg p-3 hover:cursor-pointer"
              >
                {social.icon({ color: "black", size: 20 })}
                <h2 className="text-slate-700 font-extrabold">{social.name}</h2>
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-20 border-[2px] border-slate-500 p-5 rounded-2xl">
          <Input label="First Name" type="text" variant="underlined"/>
          <Input label="Last Name" type="text" variant="underlined"/>
          <Input label="Email" type="email" variant="underlined"/>
          <Input label="Phone Number" type="number" variant="underlined"/>
          <Input label="Message" type="text" className="col-span-2" variant="underlined"/>
          <Button
            className="text-white text-sm font-bold bg-cyan-800 col-span-2"
            variant="secondary"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  };
  
  export default Contact;
  
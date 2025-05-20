/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import {
  LucideBotMessageSquare,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon,
  YoutubeIcon,
  GithubIcon,
  MailIcon,
  ShipWheelIcon,
  Send,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const socialConnects = [
  {
    id: 1,
    name: "Github",
    link: "https://www.github.com/SoumyadeepOSD",
    icon: (props: any) => <GithubIcon {...props} />,
  },
  {
    id: 2,
    name: "Linkedin",
    link: "https://www.linkedin.com/in/soumyadeep-das-bhowmick-01a882234",
    icon: (props: any) => <LinkedinIcon {...props} />,
  },
  {
    id: 3,
    name: "Gmail",
    link: "mailto:developersuniverse24@gmail.com",
    icon: (props: any) => <MailIcon {...props} />,
  },
  {
    id: 4,
    name: "Twitter",
    link: "https://x.com/SoumyadeepDasB6",
    icon: (props: any) => <TwitterIcon {...props} />,
  },
  {
    id: 5,
    name: "Facebook",
    link: "https://www.facebook.com/soumyadeep.dasbhowmick.79",
    icon: (props: any) => <FacebookIcon {...props} />,
  },
  {
    id: 6,
    name: "YouTube",
    link: "https://www.youtube.com/@Open-Container",
    icon: (props: any) => <YoutubeIcon {...props} />,
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const sendMessage = async () => {
    setLoading(true);
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.email === "" ||
      data.message.length < 10
    ) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Please fill all the fields correctly.",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/send-email", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failure!",
          description: "Failed to send message",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
      toast({
        title: "Error!",
        description: "Failed to send message.",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-x-10 h-full w-full mt-5 md:mt-20">
      <Toaster />

      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="bg-gradient-to-br from-cyan-300 to-blue-800 text-transparent bg-clip-text font-extrabold text-6xl">
            Let&apos;s Talk!
          </h1>
          <h2 className="text-slate-700 text-sm font-normal">
            I&apos;d love to hear from you.
          </h2>
        </div>
        <div className="bg-gradient-to-tr from-blue-700 to-gray-900 rounded-full h-32 w-32 flex flex-col items-center justify-center shadow-large">
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
              className="flex flex-row items-center gap-2 border-[0px] border-gray-300 rounded-lg p-3 hover:cursor-pointer shadow-large hover:animate-pulse hover:bg-gradient-to-br from-slate-100 to-slate-300"
            >
              {social.icon({ color: "black", size: 20 })}
              <h2 className="text-slate-700 font-extrabold">{social.name}</h2>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-14 border-[2px] border-white shadow-large p-5 rounded-2xl mx-5 my-10 md:my-0 bg-gradient-to-tr from-slate-200/40 to-slate-500/50 relative z-10 backdrop-blur-md backdrop-opacity-30">
        <Input
          label="First Name"
          type="text"
          variant="underlined"
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <Input
          label="Last Name"
          type="text"
          variant="underlined"
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          variant="underlined"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label="Phone Number"
          type="number"
          variant="underlined"
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
        <textarea
          onChange={(e) => handleChange("message", e.target.value)}
          value={data.message}
          placeholder="Message"
          className="border-2 border-slate-300 p-3 rounded-lg col-span-2"
        />
        <Button
          onClick={sendMessage}
          disabled={loading}
          className="col-span-2"
        >
          {loading ? (
            <ShipWheelIcon className="animate-spin" />
          ) : (
            <Send />
          )}
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default Contact;

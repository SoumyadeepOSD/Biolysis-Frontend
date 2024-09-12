/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from '@/components/ui/card';
import Placeholder from './_components/main-section/placeholder';
import MenuComponent from './_components/menu-component';
import Image from 'next/image';
import { LogoImage } from './_components/images/images';
import axios from 'axios';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

interface chatMessages {
  sender: "user" | "api";
  content: string;
  loading?: boolean; // Optional loading property to track if API message is still being generated
}

const Home = () => {
  const [query, setQuery] = useState<string>(""); // No need for null type
  const [chatHistory, setChatHistory] = useState<chatMessages[]>([]);
  const { toast } = useToast();

  const generateResponse = async () => {
    setQuery(""); // Ensure this is called to clear the input field
    try {
      if (!query) {
        toast({
          variant: "destructive",
          title: "Warning⚠️",
          description: "Enter the compound name first",
        });
        return;
      }

      setChatHistory([...chatHistory, { sender: "user", content: query }]);
      setChatHistory((prev) => [
        ...prev,
        { sender: "api", content: "", loading: true }
      ]);
      
      const response = await axios.get(`/api/general-response?query=${query}`);

      if (response.status === 200) {
        setChatHistory((prev) =>
          prev.map((message) =>
            message.sender === "api" && message.loading
              ? { ...message, content: response.data.data.response, loading: false }
              : message
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error❌",
        description: `Failed to fetch data due to ${error}`,
      });
    }
  };

  return (
    <div className="bg-slate-50 w-full h-screen flex flex-col justify-center items-center p-2">
      <Toaster />
      <Card className="h-[90%] w-[90%] flex flex-col items-center p-10">
        <div className="flex flex-row items-center justify-center">
          <Image src={LogoImage} alt={'logo'} height={100} width={100} style={{ objectFit: 'contain' }} />
        </div>
        <div className="w-full">
        <MenuComponent />
        </div>
        <section className="flex flex-col items-center justify-between h-[80%] w-full">
          <Placeholder chatHistory={chatHistory} />
          <div className="flex flex-row w-screen items-center justify-center space-x-2 text-black mt-10">
            <Input type="text" placeholder="Enter compound name" onChange={(e) => setQuery(e.target.value)} className="w-[60%]" value={query}/>
            <Button type="submit" onClick={generateResponse}>Search</Button>
          </div>
        </section>
      </Card>
    </div>
  );
}

export default Home;

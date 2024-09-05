"use client";

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import Placeholder from './_components/main-section/placeholder'
import MenuComponent from './_components/menu-component'
import Image from 'next/image'
import { LogoImage } from './_components/images/images'
import axios from 'axios'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'

const Home = () => {
  const [query, setQuery] = useState<string | null>("");
  const [data, setData] = useState<unknown | null>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast()

  const generateResponse = async () => {
    
    try {
      if (query === null || query === "") {
        toast({
          variant: "destructive",
          title: "Warning⚠️",
          description: "Enter the compound name first",
        });
        return;
      }
      setLoading(true);
      const response = await axios.get(`/api/general-response?query=${query}`)
      if (response.status === 200) {
        setData(response.data.data.response);
        setLoading(false);
        console.log(response.data.data.response);
      }
    } catch (error: unknown | null) {
      setLoading(false);
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error❌",
        description: `Failed to fetch data due to ${error}`,
      });
    }
  }


  return (
    <div className="bg-red-100 w-full h-screen flex flex-col justify-center items-center p-2">
      <Toaster />
      <Card className="h-[90%] w-[90%] flex flex-col items-center p-10">
        <div className="flex flex-row items-center justify-center">
          <Image src={LogoImage} alt={'logo'} height={100} width={100} style={{ objectFit: 'contain' }} />
        </div>
        <MenuComponent />
        <div className="flex flex-row w-full max-w-sm items-center justify-center space-x-2 text-black mt-10">
          <Input type="email" placeholder="Enter compound name" onChange={(e) => setQuery(e.target.value)} />
          <Button type="submit" onClick={generateResponse}>Search</Button>
        </div>
        <Placeholder type={loading ? "loading" : !loading&&data ? "success" : "default"} data={data} />
      </Card>
    </div>
  )
}

export default Home
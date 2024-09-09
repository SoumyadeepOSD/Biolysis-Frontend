import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from "@/components/ui/skeleton"


const DataAnalysis = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async() => {
    setLoading(true);
    try {
      if(!query){
        toast({
          title: "Warning⚠️",
          description: "Enter the experiment name/description first",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      const res = await axios.get(`/api/experiment-response?query=${query}`);
      // if(res.status===200){
      //   setData(res.data.data.response);
      //   setLoading(false);
      // }
      console.log(res);
      
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="h-full">
        <Toaster/>
        <p className="font-semibold text-slate-700 text-lg p-3">Describe your experiment, AI will handle rest of all</p>
        <Textarea 
          placeholder="Write Experiment name / Experiment description" 
          className="bg-white my-3"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Button onClick={onSubmit}>Submit</Button>
        {!loading&&data&&<p>{JSON.stringify(data)}</p>}
        {loading
        &&
        <div className="flex flex-col items-start justify-center gap-3">
        <Skeleton className="w-[100%] h-[10vh] rounded-xl" />
        <Skeleton className="w-[80%] h-[10vh] rounded-xl" />
        <Skeleton className="w-[60%] h-[10vh] rounded-xl" />
        </div>
        }
    </div>
  )
}

export default DataAnalysis
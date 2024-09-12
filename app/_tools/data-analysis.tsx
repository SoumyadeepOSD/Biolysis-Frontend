import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image';
import { emptyLab } from '../_components/images/images';

interface compoundMeataData {
  name_of_compounds: string;
  catalysts: string;
  reaction_mechanism: string;
  type_of_reaction: string;
  products_of_reaction: string;
  temp: string;
  humidity: string;
  other_factors: string;
  apparatures: string;
  process: string;
  reaction: string;
}


const DataAnalysis = () => {
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<compoundMeataData>({
    name_of_compounds: "",
    catalysts: "",
    reaction_mechanism: "",
    type_of_reaction: "",
    products_of_reaction: "",
    temp: "",
    humidity: "",
    other_factors: "",
    apparatures: "",
    process: "",
    reaction:"",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!query) {
        toast({
          title: "Warning⚠️",
          description: "Enter the experiment name/description first",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      const res = await axios.get(`/api/experiment-response?query=${query}`);
      if (res.status === 200) {
        const response = res.data.data.response;
        setData({
          ...response,
        });
        setLoading(false);
        setQuery("");
      }
      console.log(res);
      setQuery("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setQuery("");
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="h-full">
      <Toaster />
      <p className="font-semibold text-slate-700 text-lg p-3">Describe your experiment, AI will handle rest of all</p>
      <Textarea
        placeholder="Write Experiment name / Experiment description"
        className="bg-white my-3"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <Button onClick={onSubmit}>Submit</Button>

      {!loading && <section className="bg-blue-50 rounded-md p-3 mt-3 h-[50vh] overflow-scroll">
        {!loading && data &&
          <div className="flex flex-col gap-2 items-start justify-start">
            {data.name_of_compounds && <p>
              <span className="font-bold text-lg">(1) Names of Reactants:</span>
              <span className="text-slate-500 font-bold">{data.name_of_compounds}</span>
            </p>
            }
            {data.type_of_reaction && <p>
              <span className="font-bold text-lg">(2) Type of Reaction:</span>
              <span className="text-slate-500 font-bold">{data.type_of_reaction}</span>
            </p>
            }
            {data.apparatures && <p>
              <span className="font-bold text-lg">(3) Apparatus:</span>
              <span className="text-slate-500 font-bold">{data.apparatures}</span>
            </p>
            }
            {data.catalysts && <p>
              <span className="font-bold text-lg">(4) Catalysts:</span>
              <span className="text-slate-500 font-bold">{data.catalysts}</span>
            </p>
            }
            {data.other_factors && <p>
              <span className="font-bold text-lg">(5) Other Factors:</span>
              <span className="text-slate-500 font-bold">{data.other_factors}</span>
            </p>
            }
            {data.humidity && <p>
              <span className="font-bold text-lg">(6) Humidity:</span>
              <span className="text-slate-500 font-bold">{data.humidity}</span>
            </p>
            }
            {data.process && <p>
              <span className="font-bold text-lg">(7) Process:</span>
              <span className="text-slate-500 font-bold">{data.process}</span>
            </p>
            }
            {data.products_of_reaction && <p>
              <span className="font-bold text-lg">(8) Products of Reaction:</span>
              <span className="text-slate-500 font-bold">{data.products_of_reaction}</span>
            </p>
            }
            {data.temp && <p>
              <span className="font-bold text-lg">(9) Temperature:</span>
              <span className="text-slate-500 font-bold">{data.temp || "NA"}</span>
            </p>
            }
            {data.reaction_mechanism && <p>
              <span className="font-bold text-lg">(10) Reaction Mechanism:</span>
              <span className="text-slate-500 font-bold">{data.reaction_mechanism}</span>
            </p>
            }
            {data.reaction && <p>
              <span className="font-bold text-lg">(10) Reaction:</span>
              <span className="text-slate-500 font-bold">{data.reaction}</span>
            </p>
            }
          </div>
        }
        {!query && !data.name_of_compounds && <div className="flex flex-col items-center justify-center opacity-50 pt-20">
          <Image
            src={emptyLab}
            alt="empty lab"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <p className="text-slate-500 font-semibold text-center py-2">Write experiment name to get your results virtually</p>
        </div>
        }
      </section>
      }
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
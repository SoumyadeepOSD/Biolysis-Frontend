"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { dataAnalysis, generateDiagram, LogoImage, virtualLabAssistant, visualize3D } from "../_components/images/images";
import Image from "next/image";
import MenuComponent from "../_components/menu-component";
import GenerateDiagram from "../_tools/generate-diagram";
import DataAnalysis from "../_tools/data-analysis";
import Visualize3D from "../_tools/visualize-3d";
import VirualLabAssistant from "../_tools/virtual-lab-assistant";

const CompoundVisualization: React.FC = () => {
  const toolsName = [
    { id: 0, name: "Generate Diagram", path: "/generate-diagram", tool: <GenerateDiagram />, icon: generateDiagram },
    { id: 1, name: "Data Analysis", path: "/data-analysis", tool: <DataAnalysis />, icon: dataAnalysis },
    { id: 2, name: "Visualize in 3D", path: "/visualize-in-3d", tool: <Visualize3D />, icon: visualize3D },
    { id: 3, name: "Virtual Lab", path: "/virtual-lab-assistant", tool: <VirualLabAssistant />, icon: virtualLabAssistant }
  ];

  const [selected, setSelected] = useState(toolsName[0]);

  const toogleTabs = (id: number) => {
    const selectedTool = toolsName.find(tool => tool.id === id);
    if (selectedTool) {
      setSelected(selectedTool);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-100">
      <Card className="h-[98%] w-[98%] flex flex-col items-center p-3 bg-slate-200">
        <div className="flex flex-row items-center justify-start w-full">
          <MenuComponent />
          <Image src={LogoImage} alt={'logo'} height={100} width={100} style={{ objectFit: 'contain' }} />
        </div>
        <div className="flex flex-col gap-5 md:flex-row items-center justify-between w-full h-full">
          <Card className="h-[100%] w-full md:w-[20%] py-5">
            <section className="grid grid-cols-2 gap-1 md:flex flex-col items-start justify-center px-3">
              {toolsName.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => toogleTabs(tool.id)}
                  className={`my-5 border-[1px] p-5  rounded-xl w-full cursor-pointer min-h-fit hover:bg-purple-100 
                    ${selected.id === tool.id ? 'border-blue-500' : 'border-slate-300'}`}
                >
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-sm md:text-base">{tool.name}</p>
                    <Image src={tool.icon} alt={'tool'} height={50} width={50} style={{ objectFit: 'contain' }} />
                  </div>
                </div>
              ))}
            </section>
          </Card>
          <Card className="h-fit md:h-[100%] w-full md:w-[79%] flex flex-col p-5">
            {selected.tool}
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default CompoundVisualization;

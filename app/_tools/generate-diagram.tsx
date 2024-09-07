import React from 'react'
import Image from 'next/image'
import { emptyLab } from '../_components/images/images'
import { Toaster } from "@/components/ui/toaster";

const GenerateDiagram = () => {
  return (
    <div>
        <Toaster />
        <p>Generate Diagram</p>
        <Image
              src={emptyLab}
              alt="empty lab"
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
        />
    </div>
  )
}

export default GenerateDiagram
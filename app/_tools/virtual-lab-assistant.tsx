import React from 'react'
import Image from 'next/image'
import { emptyLab } from '../_components/images/images'

const VirualLabAssistant = () => {
  return (
    <div>
        <p>Virtual Lab Assistant</p>
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

export default VirualLabAssistant
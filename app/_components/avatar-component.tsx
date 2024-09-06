import React from 'react'
import Image from 'next/image';
import { userAvatar, responseAvatar } from './images/images';

const UserAvatar = () => {
    return (
        <Image
            alt="user"
            src={userAvatar}
            width={40}  // Adjusted avatar size
            height={40} // Adjusted avatar size
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
    );
}

const AgentAvatar = () => {
    return (
        <Image
            alt="agent"
            src={responseAvatar}
            width={50}  // Adjusted avatar size
            height={50} // Adjusted avatar size
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
    )
}

export { UserAvatar, AgentAvatar }
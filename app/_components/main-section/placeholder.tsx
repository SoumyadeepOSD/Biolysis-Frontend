import React, { useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import "../../globals.css";
import { cn } from '@/lib/utils';
import { AgentAvatar, UserAvatar } from '../avatar-component';
import { Remarkable } from 'remarkable';

const md = new Remarkable();
interface ChatMessages {
    sender: "user" | "api";
    content: string;
    loading?: boolean; // Optional loading property to track if API message is still being generated
}

const Placeholder = ({chatHistory}: {chatHistory: ChatMessages[]}) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className={cn(`bg-slate-100 mt-10 p-5 rounded-2xl font-light text-base text-black w-[120%] md:w-[70%] ${chatHistory.length === 0 ? "overflow-hidden" : "overflow-y-scroll"}`)} ref={chatContainerRef}>
            {chatHistory.length === 0 && <p className="text-center text-gray-500">Type About compound name to get started</p>}
            {chatHistory.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={cn(
                            `flex flex-row ${item.sender === "user" ? "items-center justify-end" : "items-start justify-start"} gap-2 my-3 ${item.sender === "user" ? "bg-blue-100" : "bg-purple-200"} p-2 rounded-xl`
                        )}
                    >
                        {/* Show avatar */}
                        <div className="bg-white rounded-full p-2 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                            {item.sender === "user" ? <UserAvatar/> : <AgentAvatar/>}
                        </div>

                        {/* Show skeleton while loading for API messages */}
                        {item.sender === "api" && item.loading ? (
                            <div className="flex flex-col space-y-3 items-center justify-center">
                                <Skeleton className="h-[80px] w-[150px] rounded-xl" />
                                <Skeleton className="h-4 w-[80%]" />
                            </div>
                        ) : (
                            <div className="markdown-content" dangerouslySetInnerHTML={{__html: md.render(item.content)}}/>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Placeholder;

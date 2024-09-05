import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { Remarkable } from 'remarkable';
import "../../globals.css";

const md = new Remarkable();

const Placeholder = ({ type, data }: { type: string, data: unknown | null }) => {
    if (type === "default") {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-gray-400 font-bold text-sm">Enter Compound name to see magic🔮</p>
            </div>
        );
    } else if (type === "loading") {
        return (
            <div className="flex flex-col space-y-3 items-center justify-center h-screen w-screen">
                <Skeleton className="h-[125px] w-[60%] rounded-xl" />
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-4 w-[60%]" />
            </div>
        );
    } else {
        const htmlContent = md.render(String(data));

        return (
            <div className="bg-slate-300 mt-10 p-5 rounded-2xl font-light text-base text-black w-[70%]">
                <div
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </div>
        );
    }
}

export default Placeholder;

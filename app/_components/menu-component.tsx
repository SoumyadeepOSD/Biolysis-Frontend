import { MenuIcon } from 'lucide-react'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'

const MenuComponent = () => {
    const menuItems = [
        { id: 1, path: "/", name: "Home" },
        { id: 2, path: "/advance-analysis", name: "Advance Analysis" },
        { id: 3, path: "/contact", name: "Contact Developer" },
        { id: 4, path: "/about", name: "About" }
    ]
    return (
        <div className="flex flex-row items-center justify-start">
            <Sheet>
                <SheetTrigger >
                    <MenuIcon height={30} width={30} className="hover:cursor-pointer" />
                </SheetTrigger>
                <SheetContent side={"left"} className="bg-white">
                    <SheetHeader>
                        <SheetTitle className="text-black">Menu</SheetTitle>
                        <SheetDescription>
                            {
                                menuItems.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="my-5 hover:cursor-pointer hover:text-cyan-600 transition translate-x-2"
                                        >
                                            <Link
                                                href={item.path}
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                    );
                                })
                            }
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MenuComponent
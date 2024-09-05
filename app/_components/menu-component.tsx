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

const MenuComponent = () => {
    const menuItems = ["Home", "Advance Analysis", "Contact Developer","About"]
    return (
        <div className="flex flex-row items-center justify-start w-full">
            <Sheet>
                <SheetTrigger >
                    <MenuIcon height={30} width={30} className="hover:cursor-pointer" />
                </SheetTrigger>
                <SheetContent side={"left"} className="bg-white">
                    <SheetHeader>
                        <SheetTitle className="text-black">Menu</SheetTitle>
                        <SheetDescription>
                            {
                                menuItems.map((item, index)=>{
                                    return(
                                        <div key={index} className="my-5 hover:cursor-pointer hover:text-cyan-600 transition translate-x-2">
                                            {item}
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
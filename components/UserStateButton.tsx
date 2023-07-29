import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import Link from "next/link";

const UserStateButton = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-9 px-0">
                        <Icons.user className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <span className="sr-only">User</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem >
                        <Icons.sun className="mr-2 h-4 w-4" />
                        <Link href={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <Icons.sun className="mr-2 h-4 w-4" />
                        <Link href={"/sign-in"}>Sign in</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <Icons.sun className="mr-2 h-4 w-4" />
                        <Link href={"/sign-up"}>Sign up</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserStateButton;
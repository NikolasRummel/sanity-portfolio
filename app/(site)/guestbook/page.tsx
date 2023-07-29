import GuestBookMessage from "@/components/GuestBookMessage";
import React from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {auth} from "@clerk/nextjs";

export default async function Page() {
    const {userId} = auth();

    return (
        <div className="min-h-screen justify-center mt-32">
            <h1 className="mb-28">
                <span
                    className="block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                  Guestbook
                </span>
                <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
                  Leave your message in the Guestbook.
                </span>
            </h1>

            {userId && (
                <div className="flex space-x-2 mb-10">
                    <Input placeholder="leave your message here..."/>
                    <Button>Send</Button>
                </div>
            )}

            {!userId && (
                <div className="flex space-x-2 mb-10">
                    <p>You are not logged in. Please <a href="/sign-in" className="font-medium border-b-2 border-blue-400 dark:border-teal-400 ">sign in</a> to leave a message here.</p>
                </div>
            )}

            <GuestBookMessage/>
            <GuestBookMessage/>
            <GuestBookMessage/>
            <GuestBookMessage/>
            <GuestBookMessage/>
            <GuestBookMessage/>
            <GuestBookMessage/>
            <GuestBookMessage/>
            <GuestBookMessage/>
        </div>
    );
}
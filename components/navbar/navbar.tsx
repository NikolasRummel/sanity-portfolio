"use client";

import {Disclosure} from "@headlessui/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ThemeToggle} from "@/components/navbar/theme-toggle";
import {CommandMenu} from "@/components/navbar/command-menu";
import {siteConfig} from "@/config/site";

export default function Navbar() {
    let pathname = usePathname() || "/";
    return (
        <Disclosure as="nav">
            {({open}) => (
                <>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 lg:backdrop-blur-2xl">
                        <div className="flex justify-between h-16">
                            <div className="flex justify-between w-full">
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                                    {siteConfig.mainNav.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            lang={item.lang}
                                            prefetch
                                            aria-current={pathname === item.href ? "page" : undefined}
                                            className={`text-sm font-medium h-full inline-flex items-center px-1 pt-1 hover:text-teal-600 dark:hover:text-teal-400 ${
                                                pathname === item.href ? "text-teal-600 dark:text-teal-400" : "text-gray-600 dark:text-gray-400"
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center justify-end pt-2">
                                    <CommandMenu/>
                                    <ThemeToggle/>
                                </div>
                            </div>

                            <div className="-mr-2 flex items-center sm:hidden">
                                <ThemeToggle/>
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 dark:hover:bg-gray-800">
                                    {open ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                            />
                                        </svg>
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {siteConfig.mainNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    lang={item.lang}
                                    prefetch
                                    aria-current={pathname === item.href ? "page" : undefined}
                                    className={`${
                                        pathname == item.href
                                            ? "bg-teal-50  border-teal-500 text-teal-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800 dark:text-teal-400"
                                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-teal-600 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 border-l-4 text-base font-medium dark:text-white"
                                    } `}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
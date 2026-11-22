"use client";

import {Disclosure} from "@headlessui/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {X, Menu} from "lucide-react";
import {ThemeToggle} from "@/components/navbar/theme-toggle";
import {CommandMenu} from "@/components/navbar/command-menu";
import {siteConfig} from "@/config/site";

export default function Navbar() {
    const pathname = usePathname() || "/";
    return (
        <Disclosure as="nav" className="nav" aria-label="Hauptnavigation">
            {({open}) => (
                <div className="container">
                    <div className="nav__bar">
                        <Link href="/" className="nav__brand">{siteConfig.name}</Link>
                        <div className="nav__links">
                            {siteConfig.mainNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    lang={item.lang}
                                    prefetch
                                    aria-current={pathname === item.href ? "page" : undefined}
                                    className="nav__link"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                        <div className="nav__tools">
                            <span className="nav__desk"><CommandMenu/></span>
                            <ThemeToggle/>
                            <Disclosure.Button className="nav__toggle" aria-label={open ? "Menü schließen" : "Menü öffnen"}>
                                {open ? <X size={22} aria-hidden="true"/> : <Menu size={22} aria-hidden="true"/>}
                            </Disclosure.Button>
                        </div>
                    </div>
                    <Disclosure.Panel className="nav__sheet clear">
                        {siteConfig.mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                lang={item.lang}
                                prefetch
                                aria-current={pathname === item.href ? "page" : undefined}
                                className="nav__link"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}

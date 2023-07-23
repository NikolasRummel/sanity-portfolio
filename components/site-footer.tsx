import * as React from "react";
import Link from "next/link";
import {siteConfig} from "@/config/site";

function SiteFooter() {
    return (
        <footer className='body-font mt-24 bg-skin-primary'>
            <hr className='my-4 border-skin-primary-muted' />
            <div className='flex flex-col md:flex-row md:justify-between'>
                <div>
                    <ul>
                        {siteConfig.mainNav.map((link, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`my-2 w-max hover:underline hover:underline-offset-4`}>
                                    <Link href={link.href} passHref>
                                        {link.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <ul>
                        {siteConfig.mainNav.map((link, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`my-2 w-max hover:underline hover:underline-offset-4`}>
                                    <Link
                                        href={link.href}
                                        passHref
                                        target='_blank'
                                        rel='noopener noreferrer'>
                                        {link.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div>
                    <ul>
                        {siteConfig.mainNav.map((link, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`my-2 w-max hover:underline hover:underline-offset-4`}>
                                    <Link
                                        href={link.href}
                                        passHref
                                        target='_blank'
                                        rel='noopener noreferrer'>
                                        {link.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default SiteFooter;

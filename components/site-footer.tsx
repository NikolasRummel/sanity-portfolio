import Link from "next/link";
import {siteConfig} from "@/config/site";

function SiteFooter() {
    return (
        <footer>
            <hr className="mt-24 border-skin-primary-muted"/>
            <div className="flex flex-col md:flex-row md:justify-between ">
                <div className="my-4 md:my-0">
                    <ul>
                        {siteConfig.mainNav.map((link, index) => (
                            <li
                                key={index}
                                className={`my-2 w-max md:hover:underline md:hover:underline-offset-4`}
                            >
                                <Link href={link.href} passHref>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="my-4 md:my-0">
                    <ul>
                        {siteConfig.mainNav.map((link, index) => (
                            <li
                                key={index}
                                className={`my-2 w-max md:hover:underline md:hover:underline-offset-4`}
                            >
                                <Link href={link.href} passHref target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="my-4 md:my-0">
                    <ul>
                        {siteConfig.mainNav.map((link, index) => (
                            <li
                                key={index}
                                className={`my-2 w-max md:hover:underline md:hover:underline-offset-4`}
                            >
                                <Link href={link.href} passHref target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default SiteFooter;

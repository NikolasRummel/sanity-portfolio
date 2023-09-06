import Image from "next/image";
import me from "@/public/images/me.png"

const GuestBookMessage = () => {
    return (
        <div className="mb-4 flex items-center">
            <Image src={me} alt=":(" width={50} height={50} className="rounded-full aspect-square object-cover" />
            <p className="text-gray-800 text-base block pl-2 pt-3">The guestbook is currently in development, sorry :(</p>
        </div>
    );
};

export default GuestBookMessage;
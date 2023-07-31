import {UserProfile} from "@clerk/nextjs";

export default function Page() {
    return <div className="min-h-screen my-20 flex justify-center items-center"><UserProfile/></div>;
}
import {SignUp} from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <SignUp redirectUrl={"/guestbook"} routing="path" signInUrl="/sign-in" />
        </div>
    );
}
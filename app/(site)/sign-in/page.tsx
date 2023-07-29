import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
    );
}
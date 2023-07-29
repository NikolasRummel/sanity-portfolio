import {SignUp} from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in"
                    redirectUrl="/profile"/>
            );
        </div>
    );
}
import { Suspense } from "react";
import LoginForm from "./Loginform";

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="max-w-md mx-auto mt-16 p-6 text-center">
                <p>Loading Login Form...</p>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
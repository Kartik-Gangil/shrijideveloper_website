"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setToken, isLoggedIn } from "@/utils/auth";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    // Prefetch the target route instantly as soon as the login page loads
    useEffect(() => {
        if (isLoggedIn()) {
            router.replace('/dashboard');
        } else {
            router.prefetch(callbackUrl);
        }
    }, [callbackUrl, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                if (data.token) setToken(data.token);

                // Refresh client-side router cache to register the new login token immediately
                router.refresh();
                router.push(callbackUrl);
            } else {
                setError(data.error || "Login failed");
                setLoading(false); // Only turn off loading if it fails
            }
        } catch (err) {
            setError("Network error");
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-6 border rounded">
            <h1 className="text-2xl mb-4">Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">Email</label>
                <input
                    title="email"
                    className="w-full mb-3 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                />

                <label className="block mb-2">Password</label>
                <input
                    title="password"
                    className="w-full mb-3 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                />

                {error && <p className="text-red-600 mb-2">{error}</p>}

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50 transition-opacity"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </div>
    );
}
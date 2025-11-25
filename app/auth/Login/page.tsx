"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";



export default function LoginPage() {
const {login,loading,error} = useAuthStore();
const router = useRouter();
const [email,setEmail] = useState("");
const [ password,setPassword] = useState("");

const handleLogin = async (e:React.FormEvent)=>{
  e.preventDefault();
  await login(email,password);
  router.push("/Home");
}



  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black px-4">
     <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Log in</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black dark:text-white"
            />

            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black dark:text-white"
            />

            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>

            <p className="text-sm text-zinc-500 text-center">
              Don't have an account?{" "}
              <Link href="/auth/Signup" className="text-red-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
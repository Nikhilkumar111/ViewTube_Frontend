"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";



export default function SignupPage() {

const router = useRouter();
const {register , loading , error} = useAuthStore();

const [fullName,setFullName] = useState("");
const [username,setUserName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [avatar ,setAvatar] = useState<File|null>(null);
const [coverImage,setCoverImage] = useState<File|null>(null);


const handleSignup = async(e:React.FormEvent)=>{
  e.preventDefault();
  if(!avatar){
    alert("Please upload valid avatar image");
    return;
  }
  if(!coverImage){
    alert("Please upload valid coverImage");
    return;
  }

  const formData = new FormData();
  formData.append("fullName",fullName);
  formData.append("username",username);
  formData.append("email",email);
  formData.append("password",password);
  formData.append("avatar",avatar);
  formData.append("coverImage",coverImage);

  const success = await register(formData);
  // If register does not return a value, just redirect after calling it
  router.push("/auth/Login");
}

return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-black px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSignup}>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="text-black dark:text-white"
            />

            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="text-black dark:text-white"
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-black dark:text-white"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-black dark:text-white"
            />

            {/* Avatar Upload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-600 dark:text-zinc-300">Avatar</label>
              <Input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files?.[0] || null)} required />
            </div>

            {/* Cover Image Upload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-600 dark:text-zinc-300">Cover Image</label>
              <Input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} required />
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>

            <p className="text-sm text-zinc-500 text-center">
              Already have an account?{" "}
              <Link href="/auth/Login" className="text-red-600 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react"; // ✅ added useEffect
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Mic, Bell } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useAuthStore } from "@/stores/authStore";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Bring in Zustand store data and actions
  const { user, logout, restoreSession } = useAuthStore(); // ✅ include restoreSession

  // ✅ Restore user session on mount
  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-red-600">YouTube</h1>
            <span className="text-[10px] text-zinc-500 -mt-3">IN</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 2h16v20H4V2zm10 12l-6-4 6-4v8z" />
              </svg>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
              </svg>
            </Button>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="flex items-center gap-2 w-[45%] max-w-2xl">
          <div className="flex w-full items-center border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 overflow-hidden rounded-md">
            <Input
              placeholder="Search"
              className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm px-3"
            />
            <Button variant="ghost" className="rounded-none border-l bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 px-6 h-10">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700">
            <Mic className="h-5 w-5" />
          </Button>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>

          {/* ✅ Conditional Auth Buttons */}
          {user ? (
            <Button
              onClick={logout}
              className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-black dark:text-white px-4 py-2 rounded-md text-sm"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm">
                <Link href="/auth/Login">Log in</Link>
              </Button>
              <Button asChild className="bg-zinc-200 hover:bg-zinc-300 text-black dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-white px-4 py-2 rounded-md text-sm">
                <Link href="/auth/Signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Sidebar overlay */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

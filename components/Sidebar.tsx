"use client";

import {
  Home,
  Heart,
  History,
  Video,
  FolderOpen,
  Users,
  HelpCircle,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import OnlyPlaylistPage from "@/app/Playlist/page";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 text-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* TOP SECTION */}
        <div>
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-red-400"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-4 gap-2">
            <SidebarButton href="/Home" icon={<Home className="h-5 w-5" />} label="Home" />
            <SidebarButton href="/Liked" icon={<Heart className="h-5 w-5" />} label="Liked Videos" />
            <SidebarButton href="/History" icon={<History className="h-5 w-5" />} label="History" />
            <SidebarButton href="/MyContent" icon={<Video className="h-5 w-5" />} label="My Content" />
            <SidebarButton href="/Collection" icon={<FolderOpen className="h-5 w-5" />} label="Collection" />
            <SidebarButton href="/Subscriptions" icon={<Users className="h-5 w-5" />} label="Subscriptions" />
            
          </nav>
        </div>
{/* <OnlyPlaylistPage/> */}
        {/* BOTTOM SECTION */}
        <div className="p-4 border-t border-zinc-800 flex flex-col gap-2">
          <SidebarButton href="/Support" icon={<HelpCircle className="h-5 w-5" />} label="Support" />
          <SidebarButton href="/Setting" icon={<Settings className="h-5 w-5" />} label="Settings" />
        </div>
      </div>
    </>
  );
}

/* Reusable Sidebar Button Component */
function SidebarButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-white hover:bg-zinc-800 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

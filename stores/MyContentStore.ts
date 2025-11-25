// 📁 /stores/useMyContentStore.ts
"use client";

import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  createdAt: string;
}

interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  coverImage?: string;
  subscribersCount?: number;
  subscribedToCount?: number;
}

interface MyContentState {
  user: User | null;
  videos: Video[];
  loading: boolean;
  error: string | null;
  fetchMyContent: () => Promise<void>;
}

const API = "http://localhost:8000";

export const useMyContentStore = create<MyContentState>((set) => ({
  user: null,
  videos: [],
  loading: false,
  error: null,

  fetchMyContent: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().accessToken;
      if (!token) {
        toast.error("You must be logged in");
        set({ loading: false });
        return;
      }

      // 🧍 Fetch user profile
      const userRes = await axios.get(`${API}/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userRes.data?.data;
      if (!user) throw new Error("User data not found");

      // 🎥 Fetch user's uploaded videos
      const videosRes = await axios.get(`${API}/api/v1/videos?userId=${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const videos = videosRes.data?.data?.videos || [];

      set({ user, videos, loading: false });
    } catch (err: any) {
      console.error("MyContent fetch error:", err);
      const message =
        err.response?.data?.message || err.message || "Failed to fetch content";
      toast.error(message);
      set({ error: message, loading: false });
    }
  },
}));

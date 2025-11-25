"use client";

import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore"; // 👈 import your auth store

interface Video {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  owner: {
    username: string;
  };
  views: number;
  isPublished: boolean;
  createdAt: string;
}

interface VideoState {
  videos: Video[];
  loading: boolean;
  error: string | null;
  fetchVideos: () => Promise<void>;
}

const Api = "http://localhost:8000";

const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  loading: false,
  error: null,

  fetchVideos: async () => {
    try {
      set({ loading: true, error: null });

      // 👇 get token from auth store
      const token = useAuthStore.getState().accessToken;

      if (!token) {
        toast.error("You must be logged in to view videos");
        set({ loading: false });
        return;
      }

      const res = await axios.get(`${Api}/api/v1/videos`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in header
        },
      });

      const data = res.data?.data || [];
      set({ videos: data, loading: false });
      toast.success("Videos loaded successfully!");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch videos";
      console.error("Video Fetch Error:", message);
      toast.error(message);
      set({ error: message, loading: false });
    }
  },
}));

export default useVideoStore;

import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  coverImage?: string;
}


interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;

  register: (formData: FormData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
}

const Api = "http://localhost:8000";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: false,
  error: null,

  // 🔹 REGISTER USER
  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(`${Api}/api/v1/users/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const { user, token } = res.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", token);

      set({ user, accessToken: token, loading: false });
      toast.success("Registration successful! 🎉");
    } catch (err: any) {
      console.error("Registration error:", err);
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      set({ error: message, loading: false });
      toast.error(message);
    }
  },

  // 🔹 LOGIN USER
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `${Api}/api/v1/users/login`,
        { email, password },
        { withCredentials: true }
      );

      const { user, accessToken } = res.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);

      set({ user, accessToken, loading: false });
      toast.success(`Welcome back, ${user.fullName || "User"} 👋`);
    } catch (err: any) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      set({ error: message, loading: false });
      toast.error(message);
    }
  },

  // 🔹 LOGOUT USER
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    set({ user: null, accessToken: null });
    toast.info("You’ve been logged out 👋");
  },

  // 🔹 RESTORE SESSION
  restoreSession: () => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      set({ user: JSON.parse(storedUser), accessToken });
      toast.message("Session restored ✅");
    }
  },
}));

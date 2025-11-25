import {create} from "zustand"
import { persist } from "zustand/middleware"
interface Video{
     id:string;
     title:string;
     thumbnail:string;
     watchedAt:string;
}

interface HistoryState{
     history:Video[];
     addVideo:(video:Omit<Video,"watchedAt">)=>void;
     removeVideo:(id:string)=>void;
     clearHistory:()=>void;
}

 const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addVideo: (video) => {
        const newVideo = { ...video, watchedAt: new Date().toISOString() };
        // Remove duplicate if exists
        const filtered = get().history.filter(v => v.id !== video.id);
        set({ history: [newVideo, ...filtered] });
      },
      removeVideo: (id) => {
        set({ history: get().history.filter(v => v.id !== id) });
      },
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "history-storage", // localStorage key
    }
  )
);

export default  useHistoryStore;









// const addVideoToHistory = useHistoryStore((state) => state.addVideo);

// addVideoToHistory({
//   id: video.id,
//   title: video.title,
//   thumbnail: video.thumbnail,
// });


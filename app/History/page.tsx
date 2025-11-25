"use client";

// import React from "react";
// // import { useHistoryStore } from "@/stores/historyStore";
// import { Button } from "@/components/ui/button";

// export default function HistoryPage() {
//   // const { history, removeVideo, clearHistory } = useHistoryStore();


  
//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 pt-16 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
//           Watch History
//         </h1>
//         {history.length > 0 && (
//           <Button
//             variant="destructive"
//             onClick={clearHistory}
//             size="sm"
//           >
//             Clear All
//           </Button>
//         )}
//       </div>

//       {history.length === 0 ? (
//         <p className="text-zinc-500 dark:text-zinc-400">
//           Your watch history is empty.
//         </p>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {history.map((video) => (
//             <div
//               key={video.id}
//               className="flex justify-between items-center p-4 bg-white dark:bg-zinc-800 rounded-md shadow-sm"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   className="w-24 h-14 object-cover rounded"
//                 />
//                 <div>
//                   <p className="text-zinc-900 dark:text-white font-medium">
//                     {video.title}
//                   </p>
//                   <p className="text-zinc-500 dark:text-zinc-400 text-sm">
//                     Watched at: {new Date(video.watchedAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//               <Button
//                 size="sm"
//                 variant="destructive"
//                 onClick={() => removeVideo(video.id)}
//               >
//                 Delete
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
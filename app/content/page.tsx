"use client"
import React, { useEffect } from 'react'
import Image from "next/image";
import  useVideoStore from "@/stores/videoStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";


const VideoContent = () => {
     const {videos , fetchVideos,loading,error} = useVideoStore();
     useEffect(()=>{
          fetchVideos();
     },[fetchVideos]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
      </div>
    );
  }


       if (error) {
    return (
      <p className="text-center text-red-500 font-medium mt-10">{error}</p>
    );
  }

if(!videos.length){
     return (
          <p className='text-center text-zinc-500 mt-10'>
                No videos found. Upload one to get started 🎥
          </p>
     )
}


return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {videos.map((video) => (
        <Card
          key={video._id}
          className="overflow-hidden rounded-lg hover:shadow-md transition-all cursor-pointer"
        >
          {/* Thumbnail */}
          <div className="relative w-full h-48">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <CardHeader className="p-4">
            <CardTitle className="text-base font-semibold line-clamp-2">
              {video.title}
            </CardTitle>
            <CardDescription className="text-sm text-zinc-600 dark:text-zinc-400">
              {video.owner?.username || "Unknown User"}
            </CardDescription>
          </CardHeader>

          {/* Footer Info */}
          <CardContent className="px-4 pb-4 text-xs text-zinc-500 dark:text-zinc-400">
            {video.views} views •{" "}
            {new Date(video.createdAt).toLocaleDateString()}
          </CardContent>
        </Card>
      ))}
    </section>
  );
};



export default VideoContent;

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMyContentStore } from "@/stores/MyContentStore";

const MyContent = () => {
  const { user, videos, loading, error, fetchMyContent } = useMyContentStore();

  useEffect(() => {
    fetchMyContent();
  }, [fetchMyContent]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading content...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Please log in to view your content.
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
      {/* Banner Section */}
      <div className="relative w-full h-48 md:h-60 bg-gradient-to-r from-purple-500 to-pink-500">
        {user.coverImage ? (
          <Image
            src={user.coverImage}
            alt="Banner"
            fill
            className="object-cover opacity-90"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-500" />
        )}
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 px-8 -mt-16 md:-mt-20">
        <div className="relative w-32 h-32 border-4 border-[#0f0f0f] rounded-full overflow-hidden">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.fullName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700" />
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
          <div>
            <h2 className="text-2xl font-semibold">{user.fullName}</h2>
            <p className="text-gray-400 text-sm">@{user.username}</p>
            <p className="text-gray-400 text-sm">
              {user.subscribersCount || 0} Subscribers •{" "}
              {user.subscribedToCount || 0} Subscribed
            </p>
          </div>

          <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2">
            Follow
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 px-8 mt-6 border-b border-gray-800 text-gray-400">
        <button className="pb-3 border-b-2 border-purple-500 text-white">
          Videos
        </button>
        <button className="pb-3 hover:text-white">Playlist</button>
        <button className="pb-3 hover:text-white">Tweets</button>
        <button className="pb-3 hover:text-white">Following</button>
      </div>

      {/* Content */}
      <div className="p-8">
        {videos.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No videos found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-200 shadow-md"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={video.thumbnail || "/images/video-placeholder.jpg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {video.views} Views •{" "}
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContent;

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnlyPlaylistPage() {
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState<{ id: number; name: string }[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // Load playlists from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("playlists");
    if (stored) {
      setPlaylists(JSON.parse(stored));
    }
  }, []);

  // Save playlists to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  // Create Playlist
  const handleCreatePlaylist = () => {
    if (!playlistName.trim()) return;
    const newPlaylist = { id: Date.now(), name: playlistName };
    setPlaylists((prev) => [...prev, newPlaylist]);
    setPlaylistName("");
  };

  // Delete Playlist
  const handleDeletePlaylist = (id: number) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== id));
    if (editId === id) setEditId(null);
  };

  // Start Editing
  const handleEdit = (id: number, name: string) => {
    setEditId(id);
    setEditName(name);
  };

  // Save Edited Playlist
  const handleSaveEdit = (id: number) => {
    if (!editName.trim()) return;
    setPlaylists((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: editName } : p))
    );
    setEditId(null);
    setEditName("");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6 pt-16">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Manage Your Playlists
      </h1>

      {/* Create Playlist */}
      <div className="flex gap-2 max-w-md mb-4">
        <Input
          placeholder="Enter playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="flex-1 text-black"
        />
        <Button
          onClick={handleCreatePlaylist}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Create
        </Button>
      </div>

      {/* Playlist Count */}
      <p className="text-sm text-black mb-4">
        Total Playlists: {playlists.length}
      </p>

      {/* Display Playlists */}
      {playlists.length > 0 ? (
        <div className="flex flex-col gap-2 max-w-md">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm text-black"
            >
              {editId === playlist.id ? (
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 text-black"
                />
              ) : (
                <span>{playlist.name}</span>
              )}

              <div className="flex gap-2">
                {editId === playlist.id ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSaveEdit(playlist.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(playlist.id, playlist.name)}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeletePlaylist(playlist.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-black">No playlists yet.</p>
      )}
    </div>
  );
}

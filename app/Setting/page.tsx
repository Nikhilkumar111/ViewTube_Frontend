"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Camera, Save, Lock } from "lucide-react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImageHelper";

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState<"details" | "password">("details");

  // ===== USER DETAILS =====
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState("Your Channel Name");
  const [email, setEmail] = useState("you@example.com");

  // ===== PASSWORD =====
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmNewPassword] = useState("");

  // ===== CROPPER =====
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.9); // 👈 less zoomed-in
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, cropped: Area) => {
    setCroppedAreaPixels(cropped);
  }, []);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    setBgImage(cropped);
    setImageSrc(null);
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900 pt-16">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <nav className="flex flex-col gap-2">
          <Button
            variant={activeTab === "details" ? "default" : "ghost"}
            onClick={() => setActiveTab("details")}
            className="justify-start"
          >
            My Details
          </Button>
          <Button
            variant={activeTab === "password" ? "default" : "ghost"}
            onClick={() => setActiveTab("password")}
            className="justify-start"
          >
            Password
          </Button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "details" ? (
          <section>
            <h2 className="text-xl font-semibold mb-4">My Details</h2>

            {/* BACKGROUND IMAGE */}
            <div className="relative w-full h-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden mb-6">
              {bgImage && (
                <Image
                  src={bgImage}
                  alt="Background"
                  fill
                  className="object-cover"
                />
              )}
              <label className="absolute bottom-2 right-2 bg-black/70 text-white px-3 py-1 text-sm rounded-md cursor-pointer flex items-center gap-1 hover:bg-black/80 transition">
                <Camera className="h-4 w-4" />
                Change Background
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBgUpload}
                />
              </label>
            </div>

            {/* PROFILE IMAGE SECTION */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-300 dark:bg-zinc-700">
                  {profileImage && (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <label className="absolute bottom-0 right-0 bg-zinc-900 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-zinc-800 transition">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileUpload}
                  />
                </label>
              </div>

              <div>
                <h3 className="text-lg font-medium">{username}</h3>
                <p className="text-sm text-zinc-500">{email}</p>
              </div>
            </div>

            {/* EDITABLE FIELDS */}
            <div className="flex flex-col gap-4 max-w-md">
              <div>
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Channel Name
                </label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter chennal name"
                  className="mt-1"
                />
              </div>

              <div>
               {/* //fetched email will be written, this is not changeable  */}
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Email
                </label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <Button className="mt-6 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </section>
        ) : (
          // PASSWORD SECTION
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" /> Change Password
            </h2>
            <div className="flex flex-col gap-4 max-w-md">
              <div>
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Old Password
                </label>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button className="mt-6 bg-red-600 hover:bg-red-700 text-white">
              Update Password
            </Button>
          </section>
        )}
      </main>

      {/* CROP MODAL */}
      {imageSrc && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg w-[90%] max-w-2xl">
            <div className="relative w-full h-80 bg-black rounded-md overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                minZoom={0.6}
                maxZoom={3}
                showGrid={false}
              />
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button variant="ghost" onClick={() => setImageSrc(null)}>
                Cancel
              </Button>
              <Button onClick={handleCropSave} className="bg-red-600 text-white">
                Save Crop
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

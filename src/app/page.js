'use client'
import { useState, useEffect } from "react";
import Header from './components/header';
import Info from './components/info';
import Sidebar from './components/sidebar';
import MuuriGallery from "./components/muuriGallery";
import { media } from './components/galleryPatches'

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);

  const toggleCamera = () => {
    setIsCameraActive((prev) => !prev);
    console.log(isCameraActive);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dp39ooacq/image/upload/v1745373858/nyovhz_black_water_texture_sea._57cb758e-9a74-4708-9473-d1f61afeae66_tmnxyb.png')"
      }}
    >
      <div className="bg-black/50 w-full h-full absolute top-0 left-0 z-10" />
      <section className="relative w-full py-10 z-30">
        <Header />
        <Sidebar onCameraToggle={toggleCamera}/>
        <Info />
        <MuuriGallery media={media} isCameraActive={isCameraActive}/>
      </section>
    </div>
  );
}

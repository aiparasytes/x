'use client'
import { useState, useEffect } from "react";
import Header from './components/header';
import Info from './components/info';
import Gallery from './components/gallery';
import P5Canvas from './components/p5js';
import SetVideo from './components/video';
import HydraCanvas from './components/hydra';
import Sidebar from './components/sidebar';

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);

  const toggleCamera = () => {
    setIsCameraActive((prev) => !prev);
    console.log(isCameraActive);
  };

  useEffect(() => {
    const isInstagramWebView = navigator.userAgent.includes("Instagram");

    if (isInstagramWebView) {
      window.location.href = "https://aiparasytes.xyz/";
    }
  }, []);
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
      <section className="relative w-full py-10 z-30">
        <Header onCameraToggle={toggleCamera} />
        <Sidebar />
        <Info />
        <Gallery />
      </section>
      <HydraCanvas isCameraActive={isCameraActive} />
    </div>
  );
}

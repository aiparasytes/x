'use client'
import { useState } from "react";
import Header from './components/header';
import Info from './components/info';
import Gallery from './components/gallery';
import P5Canvas from './components/p5js';
import SetVideo from './components/video';
import HydraCanvas from './components/hydra';
import Sidebar from './components/sidebar';

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);  // Estado para activar/desactivar la cámara

  // Función para alternar el estado de la cámara
  const toggleCamera = () => {
    setIsCameraActive((prev) => !prev);
    console.log(isCameraActive);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
      <section className="relative w-full py-10 z-30">
        <Header onCameraToggle={toggleCamera} />  {/* Pasamos la función al Header */}
        <Sidebar />
        <Info />
        <Gallery />
        <SetVideo src="/gallery/x_x_x_x.mp4" />
      </section>
      <HydraCanvas isCameraActive={isCameraActive} />
    </div>
  );
}


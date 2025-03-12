'use client';
import { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";  // Importando el ícono de cámara

export default function Header({ onCameraToggle }) {
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleIconClick = () => {
    setIsCameraActive(!isCameraActive);
    onCameraToggle(); // Llamar a la función pasada por props
  };

  return (
    <header className="text-white pb-6 relative flex items-center w-full">
      {/* Título centrado */}
      <h1 className={`text-4xl md:text-6xl font-bold  absolute left-1/2 transform -translate-x-1/2 ${isCameraActive ? 'text-black' : 'text-white'}`}>
        <span className="text-green-500">AI</span>Parasytes
      </h1>
      
      {/* Icono de cámara en el lado derecho con margen */}
      <div className="cursor-pointer ml-auto mr-4" onClick={handleIconClick}>
        <HiOutlineCamera className={`w-6 h-6 ${isCameraActive ? 'text-purple-500' : 'text-green-500'}`} /> 
      </div>
    </header>
  );
}
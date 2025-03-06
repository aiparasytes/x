'use client'
import { HiOutlineCamera } from "react-icons/hi";  // Importando el ícono de cámara

export default function Header({ onCameraToggle }) {
  const handleIconClick = () => {
    console.log("Ícono de cámara clickeado");
    onCameraToggle(); // Llamar a la función pasada por props
  };

  return (
    <header className="text-white pb-6 relative flex items-center w-full">
      {/* Título centrado */}
      <h1 className="text-2xl md:text-4xl font-bold text-white absolute left-1/2 transform -translate-x-1/2">
        <span className="text-green-500">AI</span>Parasytes
      </h1>
      
      {/* Icono de cámara en el lado derecho con margen */}
      <div className="cursor-pointer ml-auto mr-4" onClick={handleIconClick}>
        <HiOutlineCamera className="w-8 h-8 text-green-500" /> {/* Ícono de cámara */}
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HydraCanvas = ({ isCameraActive }) => {
  const canvasRef = useRef(null);
  const [hydraInstance, setHydraInstance] = useState(null);
  const videoStreamRef = useRef(null); // Almacena la referencia al stream de la cámara

  useEffect(() => {
    if (!canvasRef.current) return;

    // Ajusta el tamaño del canvas al tamaño de la ventana
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    import("hydra-synth")
      .then((module) => {
        const Hydra = module.default;
        const hydra = new Hydra({
          canvas: canvasRef.current,
          detectAudio: false,
          autoLoop: true,
        });

        setHydraInstance(hydra);
        setTimeout(updateCanvasSize, 100);
      })
      .catch((err) => console.error("Error cargando Hydra:", err));

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      canvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!hydraInstance) return;

    if (isCameraActive) {
      // Activa la cámara
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoStreamRef.current = stream; // Guarda el stream para apagarlo después
            s0.initCam();
            src(s0)
              .saturate(0)
              .contrast(1.3)
              .blend(src(o0).modulate(o0, 0.1).rotate(0.1, 0.02))
              .blend(o0)
              .invert()
              .out(o0);
          })
          .catch((err) => console.error("Error al acceder a la cámara:", err));
      } else {
        console.warn("API de medios no disponible.");
      }
    } else {
      // Apaga la cámara si está activa
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop()); // Detiene todas las pistas de video
        videoStreamRef.current = null;
      }
      osc(1, 0.1).blend(o0,0.1).out(o0); // Efecto visual alternativo sin cámara
    }
  }, [isCameraActive, hydraInstance]);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-10" />
  );
};

export default dynamic(() => Promise.resolve(HydraCanvas), { ssr: false });

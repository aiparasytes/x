"use client";

import { useEffect, useRef } from "react";
import Hydra from "hydra-synth";

const HydraCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Crear instancia de Hydra con el canvas referenciado
    const hydra = new Hydra({
      canvas: canvasRef.current,
      detectAudio: false,
      autoLoop: true,
      width: window.innerWidth * 2, // Doble resolución para mejor calidad
      height: window.innerHeight * 2,
    });

    // Generar una animación simple

    noise(1).blend(o0).modulate(o1).out(o1)
    // Cámara como fuente externa
    s0.initCam({ width: 1280, height: 720 });
    src(s0).modulate(osc(5,0.1).blend(o0,1)).out(o0);
    render(o1)

    return () => {
      canvasRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-10" />;
};

export default HydraCanvas;

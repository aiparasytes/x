"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HydraCanvas = () => {
  const canvasRef = useRef(null);
  const [Hydra, setHydra] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Carga Hydra de manera dinámica solo en el cliente
    import("hydra-synth")
      .then((module) => {
        setHydra(() => module.default);
        const hydra = new module.default({
          canvas: canvasRef.current,
          detectAudio: false,
          autoLoop: true,
          width: window.innerWidth * 2,
          height: window.innerHeight * 2,
        });

        noise(1).blend(o0).modulate(o1).out(o1);

        if (navigator.mediaDevices?.enumerateDevices) {
          navigator.mediaDevices
            .enumerateDevices()
            .then(() => {
              s0.initCam({ width: 1280, height: 720 });
              src(s0).modulate(osc(5, 0.1).blend(o0, 1)).out(o0);
            })
            .catch((err) => console.error("Error al acceder a la cámara:", err));
        } else {
          console.warn("API de medios no disponible.");
        }

        render(o1);
      })
      .catch((err) => console.error("Error cargando Hydra:", err));

    return () => {
      canvasRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-10" />;
};

// Evita que Next.js renderice este componente en el servidor
export default dynamic(() => Promise.resolve(HydraCanvas), { ssr: false });

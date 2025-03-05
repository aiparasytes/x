"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HydraCanvas = () => {
  const canvasRef = useRef(null);
  const [Hydra, setHydra] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Ajusta el tamaño del canvas al tamaño de la ventana
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    // Llama a la función al cargar el componente y cada vez que cambie el tamaño de la ventana
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Carga Hydra de manera dinámica solo en el cliente
    import("hydra-synth")
      .then((module) => {
        setHydra(() => module.default);
        const hydra = new module.default({
          canvas: canvasRef.current,
          detectAudio: false,
          autoLoop: true,
        });

        if (navigator.mediaDevices?.enumerateDevices) {
          navigator.mediaDevices
            .enumerateDevices()
            .then(() => {
              s0.initCam({
                // Resolución más alta posible
                deviceId: null,  // Puedes especificar un deviceId si es necesario
              });
            })
            .catch((err) => console.error("Error al acceder a la cámara:", err));
        } else {
          console.warn("API de medios no disponible.");
        }

        // Aplica efectos de video
        src(s0)
          .saturate(0.3)
          .contrast(1.3)
          .blend(src(o0).modulate(o0,0.1).rotate(0.1,0.02))
          .blend(o0)
          .out(o0);
      })
      .catch((err) => console.error("Error cargando Hydra:", err));

    // Limpia el event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      canvasRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 z-10" />;
};

// Evita que Next.js renderice este componente en el servidor
export default dynamic(() => Promise.resolve(HydraCanvas), { ssr: false });

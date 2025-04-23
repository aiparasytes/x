"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HydraCanvas = ({ isCameraActive }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [hydraInstance, setHydraInstance] = useState(null);
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

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
    };
  }, []);

  useEffect(() => {
    if (!hydraInstance) return;

    if (isCameraActive) {
      if (navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: "environment" } })
          .then((stream) => {
            setVideoStream(stream);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => console.error("Error al acceder a la cámara:", err));
      } else {
        console.warn("API de medios no disponible.");
      }

      ////////////////////HYDRA/////////////////////
      s0.initCam();
      src(s0)
        .saturate(0)
        .contrast(1.3)
        .blend(src(o0).modulate(o0, 0.5).rotate(0.1, 0.02))
        .blend(o0)
        .invert()
        .out(o0);
      ////////////////////HYDRA/////////////////////
    } else {
      osc(60, -0.029, 0.038)
      .diff(osc(50, 0.001))
      .modulateScale(noise(1, 0.001)).modulateScale(osc(4,0.03))
      .contrast(1.8)
      .add(src(o0))
      .brightness(-0.01)
      .contrast(0.1)
      .out();
      // Detener el video
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
        setVideoStream(null);
        s0.clear();
      }
      
    }
  }, [isCameraActive, hydraInstance]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-10" />
      <video ref={videoRef} style={{ display: "none" }} autoPlay playsInline />
    </>
  );
};

export default dynamic(() => Promise.resolve(HydraCanvas), { ssr: false });

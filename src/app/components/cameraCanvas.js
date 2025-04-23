'use client';

import { useEffect, useRef, useState } from 'react';

export default function CameraCanvas({ isCameraActive, width = 300, height = 300, fallbackImage }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    let animationFrameId;

    // Función que inicializa y reproduce la cámara
    const startCamera = async () => {
      if (!videoRef.current) {
        videoRef.current = document.createElement('video');
        videoRef.current.autoplay = true;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
      }

      try {
        // Accede a la cámara
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        videoRef.current.srcObject = stream;
        setVideoStream(stream);

        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = () => resolve();
        });

        await videoRef.current.play();
      } catch (err) {
        console.error('Error al acceder a la cámara:', err);
      }
    };

    // Función que dibuja el video en el canvas
    const drawToCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const render = () => {
        if (videoRef.current && videoStream) {
          // Aplica un filtro en blanco y negro en el canvas
          ctx.filter = 'grayscale(100%)'; // Filtro en escala de grises
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        }
        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    // Si la cámara está activa, inicia la cámara y dibuja el video
    if (isCameraActive) {
      startCamera();
      drawToCanvas();
    } else {
      // Si la cámara no está activa, dibuja la imagen de fallback en el canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = fallbackImage;
      img.onload = () => {
        ctx.filter = 'grayscale(100%)'; // Aplica filtro en blanco y negro
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      // Detener el video y el stream cuando la cámara no está activa
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop()); // Detenemos todos los tracks del stream
        setVideoStream(null); // Limpiamos el estado del stream
      }
    }

    // Limpiar recursos cuando se desmonta o cambia el estado
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop()); // Detenemos todos los tracks del stream
      }
    };
  }, [isCameraActive, videoStream, fallbackImage]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-auto object-cover"
    />
  );
}

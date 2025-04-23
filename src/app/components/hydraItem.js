'use client';
import { useEffect, useRef } from 'react';

export default function HydraItem({ code }) {
  const canvasRef = useRef(null);
  const hydraRef = useRef(null);

  useEffect(() => {
    const loadHydra = async () => {
      const { default: Hydra } = await import('hydra-synth');
      hydraRef.current = new Hydra({
        canvas: canvasRef.current,
        detectAudio: false,
        autoLoop: true,
      });

      code(hydraRef.current);
    };

    loadHydra();

    return () => {
      hydraRef.current?.stop?.();
      hydraRef.current = null;
    };
  }, [code]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="w-full h-auto object-cover"
    />
  );
}

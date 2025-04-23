'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import HydraItem from './hydraItem';
import { x1, x2, x3 } from './hydraPatches';
import CameraCanvas from './cameraCanvas';

const media = [
  { src: '01_a.png', size: 'box' },
  { src: 'https://res.cloudinary.com/dp39ooacq/video/upload/v1743359057/mindar_video/topp9h4bg89qyhtvvjgz.mp4', size: 'vertical' },
  { src: '02_a.png', size: 'box' },
  { src: 'camera', size: 'box' },
  { src: '03_a.png', size: 'box' },
  { src: 'https://www.youtube.com/watch?v=Mg7y3IkC9Eo', size: 'horizontal' },
  { src: '01_b.png', size: 'box' },
  { src: '02_b.png', size: 'box' },
  { src: 'https://res.cloudinary.com/dp39ooacq/video/upload/v1742328809/mindar_video/dhdq1ujbne1crcd9mapo.mp4', size: 'vertical' },
  { src: '03_b.png', size: 'box' },
  { src: '01_c.png', size: 'box' },
  { src: 'hydra', code: x1, size: 'horizontal' },
  { src: '02_c.png', size: 'box' },
  { src: '03_c.png', size: 'box' },
];

const isYouTube = (url: string) => /youtube\.com|youtu\.be/.test(url);
const isVideoFile = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
const getYouTubeEmbed = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

export default function MuuriGallery({ isCameraActive }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [muuriLoaded, setMuuriLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const cameraCanvasRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    import('muuri').then(({ default: Muuri }) => {
      const grid = new Muuri(gridRef.current!, {
        dragEnabled: true,
        layoutDuration: 400,
        layoutEasing: 'ease',
        layout: {
          fillGaps: true,
          horizontal: false,
          alignRight: false,
          alignBottom: false,
          rounding: false,
        },
      });

      setMuuriLoaded(true);
      return () => grid.destroy();
    });
  }, []);

  const openModal = (src: string) => setModalSrc(src);
  const closeModal = () => setModalSrc(null);

  return (
    <div className="p-8 relative">
      {/* MODAL */}
      {modalSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="max-w-full max-h-full p-4">
            <img
              src={modalSrc}
              alt="Expanded"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* MUURI GRID */}
      <div ref={gridRef} className="grid-container">
        {media.map((item, index) => {
          const isHydra = item.src === 'hydra';
          const isCamera = item.src === 'camera';
          const isYouTubeVideo = isYouTube(item.src);
          const isLocalVideo = isVideoFile(item.src);
          const isVideo = isYouTubeVideo || isLocalVideo;

          const itemClass = `item bg-red ${item.size || 'box'}`;
          const resolvedSrc = item.src.startsWith('http') ? item.src : `/gallery/${item.src}`;

          return (
            <div className={itemClass} key={index}>
              <div className="item-content overflow-hidden  flex justify-center items-center">
                {isHydra ? (
                  <HydraItem code={item.code} />
                ) : isCamera ? (
                  <CameraCanvas
                    isCameraActive={isCameraActive}
                    fallbackImage="https://res.cloudinary.com/dp39ooacq/image/upload/v1741820924/nyovhz_Three_black_sphere_collide_like_raymarching_style_floati_c6daef92-26a0-4861-a38f-3f507dd05c0c_h8igdw.png"
                  />
                ) : isYouTubeVideo ? (
                  <iframe
                    src={getYouTubeEmbed(item.src)}
                    className="w-full aspect-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : isLocalVideo ? (
                  <video src={item.src} controls className="" />
                ) : (
                  <Image
                    src={resolvedSrc}
                    alt={`Media ${index + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    onDoubleClick={() => openModal(resolvedSrc)} // Cambié onClick por onDoubleClick
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

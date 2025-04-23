'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import HydraItem from './hydraItem';
import CameraCanvas from './cameraCanvas';

const isYouTube = (url: string) => /youtube\.com|youtu\.be/.test(url);
const isVideoFile = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
const getYouTubeEmbed = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

export default function MuuriGallery({
  media,
  isCameraActive = false,
}: {
  media: any[];
  isCameraActive?: boolean;
}) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const muuriInstanceRef = useRef<any>(null);
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  // Responsivo
  useEffect(() => {
    const handleResize = () => {
      document.body.classList.toggle('mobile', window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Instancia de Muuri
  useEffect(() => {
    let isMounted = true;

    if (muuriInstanceRef.current) {
      muuriInstanceRef.current.destroy();
      muuriInstanceRef.current = null;
    }

    import('muuri').then(({ default: Muuri }) => {
      if (!isMounted || !gridRef.current) return;

      muuriInstanceRef.current = new Muuri(gridRef.current, {
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
    });

    return () => {
      isMounted = false;
      if (muuriInstanceRef.current) {
        muuriInstanceRef.current.destroy();
        muuriInstanceRef.current = null;
      }
    };
  }, []);

  const openModal = (src: string) => setModalSrc(src);
  const closeModal = () => setModalSrc(null);

  return (
    <div className="p-4 relative">
      {/* Modal */}
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

      {/* Grid */}
      <div ref={gridRef} className="grid-container">
        {media.map((item, index) => {
          const isHydra = item.src === 'hydra';
          const isCamera = item.src === 'camera';
          const isYouTubeVideo = isYouTube(item.src);
          const isLocalVideo = isVideoFile(item.src);
          const isVideo = isYouTubeVideo || isLocalVideo;

          const itemClass = `item ${item.size || 'box'}`;
          const resolvedSrc = item.src.startsWith('http') ? item.src : `/gallery/${item.src}`;

          return (
            <div className={itemClass} key={index}>
              <div className="item-content overflow-hidden flex justify-center items-center">
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
                    onDoubleClick={() => openModal(resolvedSrc)}
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

'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import MuuriGallery from '../components/muuriGallery';
import { ServicesMedia } from '../components/galleryPatches';

export default function Page() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Botón de regreso visible siempre */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => router.push('/')}
          aria-label="Return to Home"
          className="text-white p-2 rounded-full hover:bg-white/10 transition"
        >
          <ArrowLeft size={28} />
        </button>
      </div>

      {/* Galería centrada */}
      <div className="flex items-center justify-center h-full w-full p-4">
        <MuuriGallery media={ServicesMedia} />
      </div>
    </div>
  );
}

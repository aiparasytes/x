'use client';

import Image from 'next/image';

export default function Gallery() {
  const media = [
    { src: "01_a.png", col: 3, row: 3 },
    { src: "02_a.png", col: 1, row: 1 },
    { src: "03_a.png", col: 1, row: 1 },
    { src: "01_b.png", col: 2, row: 1 },
    { src: "02_b.png", col: 1, row: 1 },
    { src: "03_b.png", col: 1, row: 1 },
    { src: "01_c.png", col: 1, row: 1 },
    { src: "02_c.png", col: 1, row: 1 },
    { src: "03_c.png", col: 1, row: 1 },
    { src: "https://www.youtube.com/watch?v=Mg7y3IkC9Eo", col: 2, row: 2 },
  ];

  const isVideoFile = (url) => url.match(/\.(mp4|webm|ogg)$/i);
  const isYouTube = (url) => url.includes("youtube.com") || url.includes("youtu.be");

  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  return (
    <div className="grid grid-cols-4 auto-rows-[200px] gap-4 p-8">
      {media.map((item, index) => {
        const url = item.src;
        const embedUrl = isYouTube(url) ? getYouTubeEmbedUrl(url) : null;
        const colSpan = `col-span-${item.col}`;
        const rowSpan = `row-span-${item.row}`;

        return (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg ${colSpan} ${rowSpan} bg-black`}
          >
            {isYouTube(url) && embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isVideoFile(url) ? (
              <video src={url} controls className="w-full h-full object-cover rounded-lg" />
            ) : (
              <Image
                src={url.startsWith('http') ? url : `/gallery/${url}`}
                alt={`Media ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                priority
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

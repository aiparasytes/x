import Image from 'next/image';

export default function Gallery() {
  const images = [
    "01_a.png", "02_a.png", "03_a.png", "01_b.png", "02_b.png", "03_b.png", "01_c.png", "02_c.png", "03_c.png"
  ];

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8">
      {images.map((img, index) => (
        <div key={index} className="w-full h-auto overflow-hidden rounded-lg ">
          <Image
            src={`/gallery/${img}`}
            alt={`Image ${index + 1}`}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg"
            priority={'true'}
          />
        </div>
      ))}
    </div>
  );
}

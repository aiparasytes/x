import Image from 'next/image';
import HydraCanvas from '../components/hydra';

export default function Page() {
  const images = [
    "Flyers.png", "Merch.png", "Midi.png"
  ];

  return (
    <div className="relative flex flex-col md:flex-row justify-between h-screen p-4">
      {/* Canvas al fondo */}
      <HydraCanvas className="absolute top-0 left-0 w-full h-full z-0" />
      
      {/* Imágenes en el frente */}
      <div className="relative flex flex-col md:flex-row justify-center items-center h-full w-full z-10 gap-2 md:gap-4">
        {images.map((img, index) => (
          <div key={index} className="flex-1 flex items-center justify-center overflow-hidden">
            <Image
              src={`/services/${img}`}
              alt={`Image ${index + 1}`}
              width={400} // Puedes reducir el tamaño si las imágenes están muy grandes
              height={400} // Ajusta el tamaño según lo que necesites
              className="object-cover rounded-lg"
              priority={'true'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

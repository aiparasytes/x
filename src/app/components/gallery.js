import Image from 'next/image'

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8">
      <Image
        src="/gallery/04.png"
        alt="Image 1"
        width={600}  // Ajusta el tamaño según tu imagen
        height={400} // Ajusta el tamaño según tu imagen
        className="w-full h-auto rounded-lg"
        priority // Marca todas las imágenes con priority
      />
      <Image
        src="/gallery/05.png"
        alt="Image 2"
        width={600}  // Ajusta el tamaño según tu imagen
        height={400} // Ajusta el tamaño según tu imagen
        className="w-full h-auto rounded-lg"
        priority
      />
      <Image
        src="/gallery/08.png"
        alt="Image 3"
        width={600}  // Ajusta el tamaño según tu imagen
        height={400} // Ajusta el tamaño según tu imagen
        className="w-full h-auto rounded-lg"
        priority
      />
      <Image
        src="/gallery/09.png"
        alt="Image 3"
        width={600}  // Ajusta el tamaño según tu imagen
        height={400} // Ajusta el tamaño según tu imagen
        className="w-full h-auto rounded-lg"
        priority
      />
      {/* Agrega más imágenes según sea necesario */}
    </div>
  )
}

  
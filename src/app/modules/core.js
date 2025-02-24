import Image from 'next/image';

export default function XNeuron() {
  return (
    <div style={{ position: "relative", width: "100%", height: "1000px" }}>
      {/* Header con fondo sutil */}
      <div className="absolute top-5 left-0 w-full flex justify-center p-2 z-20">
        <div className="">
          <h1 className="text-2xl md:text-5xl font-bold text-black">
            <span className="text-blue-500">AI</span>Parasytes
          </h1>
        </div>
      </div>

      {/* Imagen de fondo */}
      <Image
        src="/x_neuron.png"
        fill
        alt="AI Parasytes Background"
        style={{ objectFit: "cover" }}
      />

      {/* INFO con mayor separación del header */}
      <div className="absolute top-32 inset-x-0 flex justify-center p-4">
        <div className="bg-white/25 backdrop-blur-lg text-black max-w-7xl p-6 md:p-8 rounded-2xl drop-shadow-lg text-center">
          <p className="text-md md:text-3xl">
            El nombre <span className="text-blue-500">AI</span>Parasytes refleja la idea central del proyecto: la IA como un ente que consume,
            modifica y parasitiza la realidad. En este mundo, la máquina no es una herramienta que sirve al humano,
            sino una entidad autónoma que se adueña de las experiencias, alterándolas, distorsionándolas y convirtiéndolas
            en algo ajeno, pero al mismo tiempo profundamente humano.
          </p>
          <p className="mt-4 md:mt-6 text-md md:text-3xl">
            La estética visual del proyecto es un collage de glitches, errores digitales y paisajes generados por IA,
            creando una sensación constante de inestabilidad y tensión. El sonido es igual de disruptivo: sintetizadores,
            frecuencias experimentales y sonidos generados por IA se entrelazan para crear una sonoridad invasiva, que
            acompaña y amplifica la sensación de ser consumido por el sistema.
          </p>
        </div>
      </div>
    </div>
  );
}

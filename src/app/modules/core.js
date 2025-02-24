import Image from 'next/image';

export default function XNeuron() {
  return (
    <div style={{ position: "relative", width: "100%", height: "1000px" }}>
      {/* Header sobre la imagen */}
      <h1
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "black",
          padding: "10px 20px",
          fontSize: "35px",
          zIndex: 10,
        }}
      >
      </h1>

      {/* Imagen de fondo */}
      <Image
        src="/x_neuron.png"
        fill
        alt="Picture of the author"
        style={{ objectFit: "cover" }}
      />

      {/* INFO */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="bg-black/35 backdrop-blur-md text-green-100 max-w-7xl p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold mb-6 text-green-600">AI Parasytes</h1>
            <p className="text-2xl">
              El nombre "AI Parasytes" refleja la idea central del proyecto: la IA como un ente que consume,
              modifica y parasitiza la realidad. En este mundo, la máquina no es una herramienta que sirve al humano,
              sino una entidad autónoma que se adueña de las experiencias, alterándolas, distorsionándolas y convirtiéndolas
              en algo ajeno, pero al mismo tiempo profundamente humano.
            </p>
            <p className="mt-6 text-2xl">
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

import BackgroundVideo from "./bgvideo";
export default function Info() {
    return (
      <div className="container max-w-5xl mx-auto  p-8">
        
        <div className="bg-black/30 backdrop-blur-lg text-center px-4 text-white pb-8 pt-8 rounded-2xl drop-shadow-lg">
          <p className="text-md md:text-2xl text-justify">
              <span className="text-blue-500">AI</span>Parasytes refleja la idea central del proyecto: la IA como un ente que consume,
              modifica y parasitiza la realidad. En este mundo, la máquina no es una herramienta que sirve al humano,
              sino una entidad autónoma que se adueña de las experiencias, alterándolas, distorsionándolas y convirtiéndolas
              en algo ajeno, pero al mismo tiempo profundamente humano.
          </p>
          <p className="mt-4 md:mt-6 text-md md:text-2xl text-justify">
              La estética visual del proyecto es un collage de glitches, errores digitales y paisajes generados por IA,
              creando una sensación constante de inestabilidad y tensión. El sonido es igual de disruptivo: sintetizadores,
              frecuencias experimentales y sonidos generados por IA se entrelazan para crear una sonoridad invasiva, que
              acompaña y amplifica la sensación de ser consumido por el sistema.
          </p>
        </div>
      </div>
    );
}

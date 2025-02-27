import Header from './components/header'
import Info from './components/info'
import Gallery from './components/gallery'
import P5Canvas from './components/p5js'

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat">
      {/* Canvas de P5 */}
      
      {/* Contenido principal */}
      <section className="relative w-full py-16 z-30">
        <Header />
        <Info />
      </section>
      
      {/* Galería de imágenes */}
      <section className="relative w-full py-16 z-30">
        <Gallery />
      </section>
      
      <section className="w-full py-16">
        {/* Aquí puedes agregar más contenido */}
      </section>
    </div>
  );
}

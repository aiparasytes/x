import Header from './components/header'
import Info from './components/info'
import Gallery from './components/gallery'
import P5Canvas from './components/p5js'
import BackgroundVideo from './components/bgvideo'
import HydraCanvas from './components/hydra'
import Sidebar from './components/sidebar'

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative">
      {/* Canvas de P5 */}
      <section className="relative w-full py-16 z-30">
        <Header />
        <Sidebar/>
        <Info />
      </section>
      {/* Galería de imágenes */}
      <section className="relative w-full z-20">
        <Gallery />
      </section>
      {/* Hydra Canvas */}
      <HydraCanvas />

       {/* Background Video */}
       <section className="relative w-full ">
       <BackgroundVideo src="/gallery/x_x_x_x.mp4"/>
      </section>
    </div>
  );
}


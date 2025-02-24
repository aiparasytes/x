import Header from './components/header'
import Info from './components/info'
import Gallery from './components/gallery'

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/gallery/01.png')" }}
    >
      {/* Contenido principal */}
      <section className="w-full py-16">
        <Header />
        <Info />
      </section>
      <section className="w-full py-16">
        <Gallery />
      </section>
      <section className="w-full  py-16">
        {/* Aquí puedes agregar más contenido */}
      </section>
    </div>
  )
}

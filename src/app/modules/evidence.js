import Image from 'next/image'

export default function XNeuron() {
  return (
    <div style={{ position: "relative", width: "100%", height: "1000px" }}>
      {/* Header sobre la imagen */}
      <h1 style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "black",
        padding: "10px 20px",
        fontSize: "35px",
        zIndex: 10
      }}>
        AI Parasytes
      </h1>

      {/* Imagen de fondo */}
      <Image
        src="/x_neuron.png"
        fill
        alt="Picture of the author"
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}

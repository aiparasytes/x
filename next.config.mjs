/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // Asegura que las rutas usen una barra al final
  async rewrites() {
    return [
      {
        source: "/prints/:slug",
        destination: "/prints/:slug.html", // Redirige internamente a archivos HTML
      },
    ];
  },
};

export default nextConfig;

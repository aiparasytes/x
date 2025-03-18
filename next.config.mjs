/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // Asegura que las rutas usen una barra al final
  async headers() {
    return [
      {
        source: "/(.*)", // Aplica a toda la app
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=*, microphone=*, geolocation=*, autoplay=*",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none", // 🔥 Permite cargar scripts de otras fuentes
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin", // 🔥 Permite recursos de otros dominios
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src * 'self' blob: data:; script-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; media-src * blob: data:; connect-src *;",
          },
        ],
      },
    ];
  },
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

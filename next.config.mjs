/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/prints/:slug',
          destination: '/prints/:slug.html', // Redirige a la ruta con .html internamente
        },
      ];
    },
  };
  
  export default nextConfig;
  
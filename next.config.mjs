/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'supreme-fortnight-69xj6rqx554ghrv64-3000.app.github.dev', 'supreme-fortnight-69xj6rqx554ghrv64-3001.app.github.dev'],
    },
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
 
  // Permite que o Next.js receba a URL da API via variável de ambiente em runtime
  // (além do build-time que já está no Dockerfile via ARG)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;

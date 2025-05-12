/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para permitir imagens de data:image
  images: {
    domains: ['placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
  },
  // Configuração para as variáveis de ambiente
  env: {
    DATAGET_TOKEN: "8e7188fbabe570d4e64f48ed54973f685e995c8186f346e08d9f8673d2b2648d",
    GHOSTSPAY_TOKEN: "f28826f0-f322-4641-9714-2d970290b719",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

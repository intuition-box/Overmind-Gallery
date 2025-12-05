/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@rainbow-me/rainbowkit',
    '@wagmi/core',
    '@wagmi/connectors',
    'viem',
    '@walletconnect/ethereum-provider',
  ],
  webpack: (config, { isServer }) => {
    // Fallbacks pour les modules Node.js côté client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }

    // Ignorer les modules problématiques côté client
    config.externals = config.externals || []
    config.externals.push({
      'thread-stream': 'commonjs thread-stream',
      'pino': 'commonjs pino',
    })

    return config
  },
  // Désactiver Turbopack pour éviter les conflits
  experimental: {
    turbo: false,
  },
}

export default nextConfig
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
  webpack: (config, { isServer, webpack }) => {
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

    // Complètement exclure les modules problématiques du bundle
    config.resolve.alias = {
      ...config.resolve.alias,
      'thread-stream': false,
      'pino': false,
      '@walletconnect/ethereum-provider': false,
      '@walletconnect/universal-provider': false,
    }

    // Exclure complètement les fichiers de test du bundle
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\.test\.|\.spec\.|\.bench\.|\.tap\.|\.helper\./,
        contextRegExp: /node_modules/
      })
    )

    return config
  },
  // Désactiver Turbopack pour éviter les conflits
  experimental: {
    turbo: {
      enabled: false,
    },
  },
}

export default nextConfig
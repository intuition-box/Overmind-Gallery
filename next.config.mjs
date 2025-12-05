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

    // Ignorer les modules problématiques côté client
    config.externals = config.externals || []
    config.externals.push({
      'thread-stream': 'commonjs thread-stream',
      'pino': 'commonjs pino',
    })

    // Exclure complètement les fichiers de test du bundle
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\.test\.|\.spec\.|\.bench\./,
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
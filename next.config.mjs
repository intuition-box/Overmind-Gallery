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

    // Exclure les imports problématiques spécifiques
    config.resolve.alias = {
      ...config.resolve.alias,
      // Fichiers de test spécifiques qui causent des erreurs
      './test/helper.js': false,
      './test/base.test.js': false,
      './test/commonjs-fallback.test.js': false,
      './decorators/test.js': false,
      './clients/decorators/test.js': false,
      './test/dropTransaction.js': false,
      './test/dumpState.js': false,
      './test/getAutomine.js': false,
      // Modules entiers problématiques
      'thread-stream': false,
      'pino': false,
      '@walletconnect/ethereum-provider': false,
      '@walletconnect/universal-provider': false,
    }

    // Plugin pour ignorer tous les fichiers de test
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
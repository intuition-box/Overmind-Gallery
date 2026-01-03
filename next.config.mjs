/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  webpack: (config) => {
    // Exclude problematic modules from webpack bundle
    config.externals.push(
      "pino-pretty",
      "lokijs",
      "encoding",
      "thread-stream"
    );

    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback["@react-native-async-storage/async-storage"] = false;
    return config;
  },
};

export default nextConfig;
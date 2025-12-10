/** @type {import('next').NextConfig} */
const nextConfig = {
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
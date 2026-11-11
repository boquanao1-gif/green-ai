/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Server-side experimental options if required
  serverExternalPackages: ['@google/genai'],
};

export default nextConfig;

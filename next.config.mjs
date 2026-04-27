/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['picsum.photos'] },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
}
export default nextConfig

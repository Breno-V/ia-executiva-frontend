if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL environment variable is required.\n" +
    "Create a .env.local file with: NEXT_PUBLIC_API_URL=http://localhost:8000"
  );
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL.replace(/^https?:\/\//, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: "standalone",

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  images: {
    remotePatterns: [
      { hostname: "cartocdn.com" },
      { hostname: "*.cartocdn.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: [
      "react-chartjs-2",
      "chart.js",
      "leaflet",
      "react-leaflet",
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: *.cartocdn.com",
              `connect-src 'self' ${apiUrl}`,
              "font-src 'self' data:",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

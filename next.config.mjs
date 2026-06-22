if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL environment variable is required.\n" +
      "Create a .env.local file with: NEXT_PUBLIC_API_URL=http://localhost:8000",
  );
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL.replace(/^https?:\/\//, "");
const wsUrl = (process.env.NEXT_PUBLIC_WS_URL || "").replace(/^wss?:\/\//, "");

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
    const isDev = process.env.NODE_ENV === "development";
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: *.cartocdn.com",
              `connect-src 'self' ${apiUrl}${wsUrl ? ` ${wsUrl}` : ""}`,
              "font-src 'self' data:",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

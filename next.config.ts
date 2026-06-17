import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ddgcogpxbhcbstztxywv.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkZ2NvZ3B4YmhjYnN0enR4eXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NzEzODgsImV4cCI6MjA5NDM0NzM4OH0.IR4hxt8QcFQ-Yk4L87YxfUACMdP9YmuCeyaT6WegwJM",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ekspora.com',
      },
    ],
  },
};

export default nextConfig;

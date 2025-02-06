/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ewlxbtgcqsrmjrqrlnhg.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/avatars/**',
          },
        ],
      },
      async headers() {
        return [
          {
            source: '/:path*{/}?',
            headers: [
              {
                key: 'X-Accel-Buffering',
                value: 'no',
              },
            ],
          },
        ]
      },
};

export default nextConfig;

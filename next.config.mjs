/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.glsl$|\.frag$|\.vert$/i,
        use: ["raw-loader"],
      },
      {
        test: /\.exr$/,
        type: "asset/resource",
      },
    );

    return config;
  },
};

export default nextConfig;

import { build } from "velite";
import sharp from "sharp";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("sharp");
    sharp.cache(false);
    config.plugins.push(new VeliteWebpackPlugin());

    config.module.rules.push({
      test: /\.ttf$/,
      use: ["file-loader"],
    });

    config.cache = {
      type: "filesystem",
      allowCollectingMemory: true,
    };

    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;

  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }

  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;

      const dev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;

      try {
        console.log("Starting Velite build...");
        await build(this.options);
        console.log("Velite build completed.");
      } catch (err) {
        console.error("Velite build failed:", err);
      }
    });
  }
}

export default nextConfig;

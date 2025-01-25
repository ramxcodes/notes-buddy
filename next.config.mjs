import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
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

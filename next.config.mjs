import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    config.cache = {
      type: "filesystem", // Enable filesystem caching
      allowCollectingMemory: true, // Optimize cache collection
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
        await build(this.options); // Start Velite build
        console.log("Velite build completed.");
      } catch (err) {
        console.error("Velite build failed:", err);
      }
    });
  }
}

export default nextConfig;

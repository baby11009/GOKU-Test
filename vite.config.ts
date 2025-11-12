import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
// import { VitePWA } from "vite-plugin-pwa";

function cacheControlPlugin(): Plugin {
  return {
    name: "cache-control",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Cache cho tất cả ảnh rotation
        if (req.url?.includes("/images/rotation/")) {
          res.setHeader("Cache-Control", "public, max-age=604800, immutable");
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.includes("/images/rotation/")) {
          res.setHeader("Cache-Control", "public, max-age=604800, immutable");
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/images/rotation",
          dest: "assets/images", // sẽ copy vào dist/assets/images
        },
      ],
    }),
    cacheControlPlugin(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   workbox: {
    //     maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    //     globPatterns: ["**/*.{js,css,html,jpg,png,svg}"],
    //     runtimeCaching: [
    //       {
    //         // Cache tất cả ảnh rotation
    //         urlPattern: /\/assets\/images\/rotation\/.*\.jpg$/,
    //         handler: "CacheFirst", // Ưu tiên lấy từ cache
    //         options: {
    //           cacheName: "rotation-images",
    //           expiration: {
    //             maxEntries: 150,
    //             maxAgeSeconds: 60 * 60 * 24 * 365, // 1 năm
    //           },
    //           cacheableResponse: {
    //             statuses: [0, 200],
    //           },
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

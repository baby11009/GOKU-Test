import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import crypto from "crypto";


function cacheControlPlugin(): Plugin {
  return {
    name: "cache-control",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.includes("/images/rotation/")) {
          const filePath = path.join("dist", req.url);
          if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            const hash = crypto.createHash("md5").update(buffer).digest("hex");
            res.setHeader("ETag", `"${hash}"`);
          }
          res.setHeader("Cache-Control", "public, max-age=604800, immutable");
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.includes("/assets/images/rotation/")) {
          const filePath = path.join("dist", req.url);
          if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            const hash = crypto.createHash("md5").update(buffer).digest("hex");
            const etag = `"${hash}"`;
            res.setHeader("ETag", etag);
            res.setHeader("Cache-Control", "public, max-age=604800, immutable");

            // Kiểm tra If-None-Match
            if (req.headers["if-none-match"] === etag) {
              res.statusCode = 304;
              return res.end();
            }
          }
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
    cacheControlPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Joi Zubeen Da",
        short_name: "Goldi Da",
        description: "A musical tribute to Zubeen Da",
        theme_color: "#000",
        background_color: "#000",
        display: "standalone",

        icons: [
          {
            src: "/img/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

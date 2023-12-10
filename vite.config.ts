import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import preact from "@preact/preset-vite";
import path from "path";

export default defineConfig({
	plugins: [
    preact(),
    VitePWA({
      includeAssets: ["/icon/icon-512.png"],
      manifest: {
        name: "Restaurant Rate",
        short_name: "RR",
        description: "",
        theme_color: "#020202",
        icons: [
          {
            src: "/icon/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@api": path.resolve(__dirname, "./src/api"),
    }
  },
  server: {
    proxy: {
      "/api": "https://restaurant-estim.onrender.com/",
      "/swagger-ui": "https://restaurant-estim.onrender.com/",
      "/v3/api-docs": "https://restaurant-estim.onrender.com/",
    }
  }
});

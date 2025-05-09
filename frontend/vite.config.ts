import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 2000, // 단위: KB (기본값: 500KB)
  },
  preview: {
    port: 4173, // 기본값
    host: true, // 외부 접근 허용
    allowedHosts: ["dailytoothbrushing.onrender.com"], // <== 이 줄 추가
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

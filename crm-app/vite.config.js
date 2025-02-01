import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  proxy: {
    "/api": "http://localhost:8080",
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});

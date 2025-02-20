import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-icons/fa": "react-icons/fa/index.esm.js",
    },
  },
});

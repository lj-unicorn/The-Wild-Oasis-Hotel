import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // ✅ Get the directory name in ES module scope (since __dirname is not available)

export default defineConfig({
  plugins: [react()],
  resolve: {
    // ✅ Set up alias for cleaner imports from src directory
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

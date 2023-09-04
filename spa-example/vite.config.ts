import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // when changing the port here, remember to
    // set cors origin allowed in BlogRestController
    port: 8100,
  },
});

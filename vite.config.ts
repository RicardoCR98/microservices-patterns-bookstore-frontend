import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const API_URL = `${env.VITE_APP_BASE_NAME}`;
  const PORT = 3000;

  return {
    server: {
      open: true,
      port: PORT,
      host: true,
    },
    preview: {
      open: true,
      host: true,
    },
    define: {
      global: "window",
    },
    resolve: {
      alias: {
        "@components": resolve(__dirname, "src/components"),
        "@extended": resolve(__dirname, "src/@extended"),
        "@hooks": resolve(__dirname, "src/hooks"),
        "@themes": resolve(__dirname, "src/themes"),
        "@utils": resolve(__dirname, "src/utils"),
        "@assets": resolve(__dirname, "src/assets"),
        "@types": resolve(__dirname, "src/types"),
      },
    },
    base: API_URL,
    plugins: [
      react(),
      tsconfigPaths(),
      ckeditor5({ theme: resolve("@ckeditor/ckeditor5-theme-lark") }),
    ],
  };
});

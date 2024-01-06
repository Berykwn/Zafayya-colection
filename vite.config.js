import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
        compression({
            algorithm: "brotliCompress",
            exclude: [/\.(br)$/, /\.(gz)$/],
            deleteOriginalAssets: true,
        }),
    ],
});

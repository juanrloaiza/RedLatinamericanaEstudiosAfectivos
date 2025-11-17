// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    vite: { plugins: [tailwindcss()], },
    i18n: {
        locales: ["es", "en", "pt-br"],
        defaultLocale: "es",
        routing: {
            prefixDefaultLocale: true
        }
    }
});

import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  tres: {
    devtools: true,
    glsl: true,
  },
  modules: ["@tresjs/nuxt"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss(), aspectRatio()],
    assetsInclude: ['**/*.glb'],
  },
  routeRules: {
    "/**": { prerender: true },
  },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
    },
  },
});

function aspectRatio() {
  return {
    name: 'vite-plugin-aspect-ratio',
    enforce: "pre" as "pre",
    transform(code: string, id: string) {
      if (id.endsWith('.css')) {
        // Example transformation: Add aspect-ratio property to CSS
        return code.replace(/aspect-ratio:\s*([\d.]+)\s*\/\s*([\d.]+);/g, (match: string, width: string, height: string) => {
          const ratio = (parseFloat(width) / parseFloat(height)).toFixed(2);
          return `aspect-ratio: ${ratio};`;
        });
      }
      return code;
    },
  };
}
// function aspectRatio() {
//   throw new Error("Function not implemented.");
// }


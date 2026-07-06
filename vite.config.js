import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // .env.local의 CONTACT_EMAIL — dev에서 /api/contact를 FormSubmit으로 중계 (프로덕션은 api/contact.js가 담당)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/contact': {
          target: 'https://formsubmit.co',
          changeOrigin: true,
          rewrite: () => `/ajax/${env.CONTACT_EMAIL}`,
          headers: {
            Origin: 'https://nxst-page.vercel.app',
            Referer: 'https://nxst-page.vercel.app/',
          },
        },
      },
    },
  };
});

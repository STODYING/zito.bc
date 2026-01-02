import { defineConfig } from 'vite';

export default defineConfig({
    // 빌드 설정
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: true
    },
    // 개발 서버 설정
    server: {
        port: 3000,
        host: '0.0.0.0'
    },
    // 환경 변수 프리픽스
    envPrefix: 'VITE_'
});

import express from 'express';
import 'dotenv/config'
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(
  '/tmdb',
  createProxyMiddleware({
    target: 'https://api.themoviedb.org/3',
    changeOrigin: true,
    pathRewrite: {
      [`^/tmdb`]: '',
    },
    on: {
      proxyReq: (proxyReq) => {
        proxyReq.setHeader(
          'Authorization',
          `Bearer ${process.env.API_KEY}`,
        );
      },
    },
  }),
);

app.listen(3000);
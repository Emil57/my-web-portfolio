// next.config.js
export default {
    output: 'export', // Ensures the app is exported as static files
    images: {
      unoptimized: true, // Optional: since GitHub Pages doesn't support image optimization
    },
    basePath: '/my-web-portfolio', // Replace with the name of your GitHub repository
    assetPrefix: '/my-web-portfolio/', // Needed for proper asset loading
  };
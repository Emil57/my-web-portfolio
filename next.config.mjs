// The site is exported as static files for GitHub Pages, which serves it
// under /<repo-name>. Set BASE_PATH="" to run it at the domain root instead.
const basePath = process.env.BASE_PATH ?? "/my-web-portfolio";

export default {
  output: "export",
  images: {
    unoptimized: true, // GitHub Pages can't run Next's image optimizer
  },
  basePath,
  env: {
    // Exposed so links to files in /public (like the résumé) get the prefix too.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

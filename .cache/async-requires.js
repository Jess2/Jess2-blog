// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("/Users/jess2/study/Jess2.io/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("/Users/jess2/study/Jess2.io/src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-about-js": () => import("/Users/jess2/study/Jess2.io/src/pages/about.js" /* webpackChunkName: "component---src-pages-about-js" */),
  "component---src-pages-index-js": () => import("/Users/jess2/study/Jess2.io/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-templates-blog-post-js": () => import("/Users/jess2/study/Jess2.io/src/templates/blog-post.js" /* webpackChunkName: "component---src-templates-blog-post-js" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/Users/jess2/study/Jess2.io/.cache/data.json")


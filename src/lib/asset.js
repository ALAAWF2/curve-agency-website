// Vite's `base` rewrites asset URLs found in HTML and CSS, but it leaves bare
// strings written inside JS untouched. GitHub Pages serves this site from
// /curve-agency-website/, so any hardcoded '/assets/...' string would resolve to
// the domain root and 404 (broken project images, partner logos, brand logos).
// Route every such path through this helper so both builds work:
//   local preview / cloudflare tunnel -> BASE_URL '/'                -> /assets/...
//   GitHub Pages                      -> BASE_URL '/curve-agency-website/' -> /curve-agency-website/assets/...
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;

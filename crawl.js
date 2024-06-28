import { JSDOM } from 'jsdom';

function normalizeURL(input, base) {
  const url = new URL(input, base);
  let fullPath = `${url.host}${url.pathname}`;

  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1);
  }
  
  return fullPath;
}

export { normalizeURL };

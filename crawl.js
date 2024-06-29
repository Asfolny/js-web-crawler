import { JSDOM } from 'jsdom';

function normalizeURL(input, base) {
  const url = new URL(input, base);
  let fullPath = `${url.host}${url.pathname}`;

  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1);
  }
  
  return fullPath;
}

function getURLsFromHTML(body, baseURL) {
  const dom = new JSDOM(body);
  const anchors = dom.window.document.querySelectorAll('a');
  let result = [];

  for (const anchor of anchors) {
    if (!anchor.hasAttribute("href")) {
      continue;
    }

    try {
      const href = new URL(anchor.getAttribute("href"), baseURL).href;
      result.push(href);
    } catch(err) {
      console.log(`${err.message}: ${href}`);
    }
  }

  return result;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  try {
    const response = await fetch(url);

    if (response.status >= 400) {
      throw new Error("Err response");
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      throw new Error("Not HTML Body");
    }

    const html = await response.text();
    console.log(html);
  } catch(err) {
    console.log(`${err.message}: ${url}`);
  }
}

export { normalizeURL, getURLsFromHTML, crawlPage };


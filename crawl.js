import { JSDOM } from 'jsdom';

function normalizeURL(input) {
  const url = new URL(input);
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

async function getURLsFromPage(url, baseURL) {
  const response = await fetch(url);

  if (response.status >= 400) {
    throw new Error("Err response");
  }

  if (!response.headers.get("content-type").includes("text/html")) {
    throw new Error("Not HTML Body");
  }

  const html = await response.text();

  return getURLsFromHTML(html, baseURL);
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  try {
    const base = normalizeURL(baseURL);
    const current = normalizeURL(currentURL);

    if (current.includes(base) === false) {
      throw new Error("Outside of base host, this is not supported");
    }

    if (current in pages) {
      pages[current]++;
      return pages;
    }
    pages[current] = 1;

    const nextArr = await getURLsFromPage(currentURL, baseURL);

    for (const url of nextArr) {
      await crawlPage(baseURL, url, pages);
    }
   
  } catch(err) {
    console.error(`${err.message}: ${currentURL}`);
  }

  return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };


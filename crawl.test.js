import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('normalize regular', () => {
  const inputs = [
    "https://blog.boot.dev/path/",
    "https://blog.boot.dev/path",
    "http://blog.boot.dev/path/",
    "http://blog.boot.dev/path"
  ];

  inputs.forEach(input => {
    const norm = normalizeURL(input);
    expect(norm).toEqual("blog.boot.dev/path");
  });
});

test("non-url input", () => {
  expect(() => normalizeURL("")).toThrow("Invalid URL");
});

test("can extract full", () => {
  const urls = getURLsFromHTML(`<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>`);

  expect(urls.length).toEqual(1);
  expect(urls[0]).toEqual("https://blog.boot.dev/");
});

test("relative url extract", () => {
  const urls = getURLsFromHTML(`<html>
    <body>
        <a href="post/2"><span>Go to Boot.dev</span></a>
        <a href="post/3"><span>Go to Boot.dev</span></a>
    </body>
</html>`, "http://blog.boot.dev");

  expect(urls.length).toEqual(2);
  expect(urls[0]).toEqual("http://blog.boot.dev/post/2");
  expect(urls[1]).toEqual("http://blog.boot.dev/post/3");
});

import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

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


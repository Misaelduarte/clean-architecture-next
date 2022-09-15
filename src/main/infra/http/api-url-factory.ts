function addTrailingSlash(url: string): string {
  if (!url.endsWith('/')) {
    return `${url}/`;
  }
  return url;
}

export function makeApiUrl(path: string, trailingSlash = true): string {
  if (trailingSlash) {
    return addTrailingSlash(`${'BASE_URL'}${path}`);
  }
  return `${'BASE_URL'}${path}`;
}

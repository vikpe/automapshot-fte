export const ASSETS_BASE_URL = "https://a.quake.world";

export function getAssetUrl(path: string): string {
  const path_ = path.replace("#", "%23").replace("+", "%2B");
  return `${ASSETS_BASE_URL}/${path_}`;
}

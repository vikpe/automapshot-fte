export type FteAssets = { [key: string]: string };

export type FtePreloadModule = {
  canvas: HTMLCanvasElement;
  arguments: string[];
  manifest: string;
  files: object;
};

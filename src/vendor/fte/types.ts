export type FteAssets = { [key: string]: string };

export type FtePreloadModule = {
  canvas: HTMLCanvasElement;
  arguments: string[];
  manifest: string;
  files: object;
};

export type FteModule = FtePreloadModule & {
  getClientState: () => void;
};

export interface FTEC {
  cbufadd: (command: string) => void;
}

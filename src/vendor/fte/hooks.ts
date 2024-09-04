import type {
  FteAssets,
  FteModule,
  FtePreloadModule,
} from "@/vendor/fte/types.ts";
import { getAssetUrl } from "@/vendor/qwcloudfront/assets/assets";
import { useEffect } from "react";
import { useBoolean, useInterval, useScript } from "usehooks-ts";

declare global {
  interface Window {
    Module: FteModule | FtePreloadModule;
  }
}

let didInit = false;

export function useFteLoader({
  scriptPath,
  assets,
}: {
  scriptPath: string;
  assets: FteAssets;
}) {
  useScript(scriptPath, { removeOnUnmount: true });
  const { value: isReady, setTrue: setIsReady } = useBoolean(false);

  useEffect(() => {
    if (didInit) {
      return;
    }

    didInit = true;

    const manifestUrl = getAssetUrl("fte/default.fmf");
    window.Module = {
      canvas: document.getElementById("fteCanvas") as HTMLCanvasElement,
      manifest: manifestUrl,
      arguments: ["-manifest", manifestUrl],
      files: assets,
    };
  }, []);

  useInterval(
    () => {
      if ((window.Module as FteModule).getClientState) {
        window.dispatchEvent(new CustomEvent("fte.event.ready"));
        setIsReady();
      }
    },
    isReady ? null : 100,
  );

  return { isReady };
}

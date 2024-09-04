import type { FteAssets, FtePreloadModule } from "@/vendor/fte/types.ts";
import { getAssetUrl } from "@/vendor/qwcloudfront/assets/assets";
import { useEffect } from "react";
import { useBoolean, useEventListener, useScript } from "usehooks-ts";
import { enableLogToEvents } from "./log";

declare global {
  interface Window {
    Module: FtePreloadModule;
  }
}

enableLogToEvents();
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

  useEventListener("fte.event.ready", setIsReady);

  return { isReady };
}

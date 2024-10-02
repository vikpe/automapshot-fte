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
  const { value: engineIsReady, setTrue: setEngineIsReady } = useBoolean(false);
  const { value: mapIsReady, setTrue: setMapIsReady } = useBoolean(false);

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

  useEventListener("fte.event.ready", setEngineIsReady);
  useEventListener("fte.trigger.f_newmap", () => {
    window.setTimeout(setMapIsReady, 250);
  });

  return { engineIsReady, mapIsReady };
}

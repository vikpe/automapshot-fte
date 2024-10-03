import { getGeneralAssets, getMapAssets } from "@/vendor/fte/assets";
import type { FtePreloadModule } from "@/vendor/fte/types.ts";
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
  mapName,
}: {
  scriptPath: string;
  mapName: string;
}) {
  const assets = {
    ...getGeneralAssets(),
    ...getMapAssets(mapName),
    "id1/config.cfg": "config.cfg",
    "qw/qwprogs.qvm": "20240909-210239_2b31159_qwprogs.qvm",
  };
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
      arguments: ["-manifest", manifestUrl, "+map", mapName],
      files: assets,
    };
  }, []);

  useEventListener("fte.event.ready", setEngineIsReady);
  useEventListener("fte.trigger.f_newmap", () => {
    window.setTimeout(setMapIsReady, 250);
  });

  return { engineIsReady, mapIsReady };
}

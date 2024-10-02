import { getGeneralAssets, getMapAssets } from "@/vendor/fte/assets";
import { useFteLoader } from "@/vendor/fte/hooks";

// read mapname from map query param
const scriptPath = "/ftewebgl.js";
const assets = {
  ...getGeneralAssets(),
  ...getMapAssets(new URLSearchParams(window.location.search).get("map") || ""),
  "id1/config.cfg": "config.cfg",
  "qw/qwprogs.qvm": "20240909-210239_2b31159_qwprogs.qvm",
};

export function FtePlayer() {
  const { engineIsReady, mapIsReady } = useFteLoader({ scriptPath, assets });

  return (
    <div>
      {engineIsReady && <div id="fteEngineIsReady" />}
      {mapIsReady && <div id="fteMapIsReady" />}
      <canvas id="fteCanvas" />
    </div>
  );
}

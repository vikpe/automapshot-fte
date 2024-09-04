import { getGeneralAssets } from "@/vendor/fte/assets";
import { useFteLoader } from "@/vendor/fte/hooks";

const scriptPath = "/ftewebgl_qtv.js";
const assets = {
  ...getGeneralAssets(),
  "id1/config.cfg": "config.cfg",
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

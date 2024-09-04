import { getGeneralAssets } from "@/vendor/fte/assets";
import { useFteLoader } from "@/vendor/fte/hooks";

const scriptPath = "/ftewebgl_qtv.js";
const assets = {
  ...getGeneralAssets(),
  "id1/config.cfg": "config.cfg",
};

export function FtePlayer() {
  const { isReady } = useFteLoader({ scriptPath, assets });
  return (
    <div>
      {isReady && <div id="fteCanvasIsReady" />}
      <canvas id="fteCanvas" />
    </div>
  );
}

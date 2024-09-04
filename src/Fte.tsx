import { getGeneralAssets } from "@/vendor/fte/assets";
import { useFteLoader } from "@/vendor/fte/hooks";

const scriptPath = "/ftewebgl_qtv.js";
const assets = {
  ...getGeneralAssets(),
  "id1/config.cfg": "config.cfg",
};

export function FtePlayer() {
  useFteLoader({ scriptPath, assets });
  return <canvas id="fteCanvas" />;
}

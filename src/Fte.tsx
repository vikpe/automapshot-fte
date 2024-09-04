import { useFteLoader } from "@/vendor/fte/hooks";
import { getGeneralAssets } from "@/vendor/fte/assets";

const scriptPath = "/ftewebgl_qtv.js";
const assets = {
  ...getGeneralAssets(),
  "id1/config.cfg": "config.cfg",
};

export function FtePlayer() {
  useFteLoader({ scriptPath, assets });
  return <canvas id="fteCanvas" />;
}

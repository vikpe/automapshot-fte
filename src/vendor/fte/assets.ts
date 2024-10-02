import { getAssetUrl } from "@/vendor/qwcloudfront/assets/assets";
import { getMapTextures } from "./mapTextures";
import type { FteAssets } from "./types.ts";

export function getMapAssets(mapName: string): FteAssets {
  const assets: FteAssets = {
    [`id1/maps/${mapName}.lit`]: getAssetUrl(`maps/${mapName}.lit`),
  };

  return {
    ...assets,
    ...getMapTextures(mapName),
  };
}

export function getGeneralAssets(): FteAssets {
  const filePaths = [
    "default.fmf",

    "id1/maps/b_batt0.bsp",
    "id1/maps/b_batt1.bsp",
    "id1/maps/b_bh10.bsp",
    "id1/maps/b_bh100.bsp",
    "id1/maps/b_bh25.bsp",
    "id1/maps/b_explob.bsp",
    "id1/maps/b_nail0.bsp",
    "id1/maps/b_nail1.bsp",
    "id1/maps/b_rock0.bsp",
    "id1/maps/b_rock1.bsp",
    "id1/maps/b_shell0.bsp",
    "id1/maps/b_shell1.bsp",

    "id1/particles/flame.cfg",
    "id1/particles/grenade.cfg",
    "id1/particles/particlefont.png",
    "id1/particles/rocket.cfg",
    "id1/particles/runes.cfg",
    "id1/particles/torch.cfg",

    "id1/progs/armor.mdl",
    "id1/progs/backpack.mdl",
    "id1/progs/bit.mdl",
    "id1/progs/bolt.mdl",
    "id1/progs/bolt2.mdl",
    "id1/progs/bolt3.mdl",
    "id1/progs/end1.mdl",
    "id1/progs/end2.mdl",
    "id1/progs/end3.mdl",
    "id1/progs/end4.mdl",
    "id1/progs/eyes.mdl",
    "id1/progs/flag.mdl",
    "id1/progs/flame.mdl",
    "id1/progs/flame2.mdl",
    "id1/progs/g_light.mdl",
    "id1/progs/g_nail.mdl",
    "id1/progs/g_nail2.mdl",
    "id1/progs/g_rock.mdl",
    "id1/progs/g_rock2.mdl",
    "id1/progs/g_shot.mdl",
    "id1/progs/gib1.mdl",
    "id1/progs/gib2.mdl",
    "id1/progs/gib3.mdl",
    "id1/progs/grenade.md3",
    "id1/progs/grenade_0.skin",
    "id1/progs/h_player.mdl",
    "id1/progs/h_player.mdl",
    "id1/progs/invisibl.mdl",
    "id1/progs/invisibl.mdl",
    "id1/progs/invulner.mdl",
    "id1/progs/invulner.mdl",
    "id1/progs/lavaball.mdl",
    "id1/progs/lavaball.mdl",
    "id1/progs/missile.md3",
    "id1/progs/missile_0.skin",
    "id1/progs/player.mdl",
    "id1/progs/quaddama.mdl",
    "id1/progs/s_bubble.spr",
    "id1/progs/s_explod.spr",
    "id1/progs/v_axe.mdl",
    "id1/progs/v_light.mdl",
    "id1/progs/v_nail.mdl",
    "id1/progs/v_nail2.mdl",
    "id1/progs/v_rock.mdl",
    "id1/progs/v_rock2.mdl",
    "id1/progs/v_shot.mdl",
    "id1/progs/v_shot2.mdl",
    "id1/progs/v_spike.mdl",

    "id1/progs/s_spike.mdl",
    "id1/progs/spawn.mdl",
    "id1/progs/spike.mdl",
    "id1/progs/star.mdl",
    "id1/progs/suit.mdl",
    "id1/progs/vwplayer.mdl",
    "id1/progs/w_axe.mdl",
    "id1/progs/w_g_key.mdl",
    "id1/progs/w_light.mdl",
    "id1/progs/w_nail.mdl",
    "id1/progs/w_nail2.mdl",
    "id1/progs/w_rock.mdl",
    "id1/progs/w_rock2.mdl",
    "id1/progs/w_s_key.mdl",
    "id1/progs/w_shot.mdl",
    "id1/progs/w_shot2.mdl",
    "id1/progs/wizard.mdl",
    "id1/progs/zom_gib.mdl",
  ];

  const assets: FteAssets = {};

  for (const path of filePaths) {
    assets[path] = getAssetUrl(`fte/${path}`);
  }

  return assets;
}

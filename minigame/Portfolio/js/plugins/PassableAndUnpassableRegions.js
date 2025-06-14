/*:
 * @target MZ
 * @plugindesc Allows specific Region IDs to be either passable or unpassable for the player, overriding default tile passability rules.
 * @author Joshua
 *
 * @param Unpassable Regions
 * @type number[]
 * @default [1]
 * @desc Region IDs that are treated as unpassable (invisible walls).
 *
 * @param Passable Regions
 * @type number[]
 * @default [2]
 * @desc Region IDs that are forced to be passable (even over walls or obstacles).
 *
 * @help
 * This plugin overrides player movement based on Region IDs.
 *
 * - Tiles with an "Unpassable Region" are always blocked.
 * - Tiles with a "Passable Region" are always walkable.
 * - If a tile has both: "Unpassable" takes priority.
 */
(() => {
  const pluginName = "PassableAndUnpassableRegions";
  const params = PluginManager.parameters(pluginName);

  const unpassableRegions = JSON.parse(params["Unpassable Regions"] || "[]").map(Number);
  const passableRegions = JSON.parse(params["Passable Regions"] || "[]").map(Number);

  const _Game_Player_canPass = Game_Player.prototype.canPass;
  Game_Player.prototype.canPass = function(x, y, d) {
    const newX = $gameMap.roundXWithDirection(x, d);
    const newY = $gameMap.roundYWithDirection(y, d);
    const regionId = $gameMap.regionId(newX, newY);

    if (unpassableRegions.includes(regionId)) {
      return false; // Block movement
    }

    if (passableRegions.includes(regionId)) {
      return true; // Force allow movement
    }

    return _Game_Player_canPass.call(this, x, y, d); // Default behavior
  };
})();

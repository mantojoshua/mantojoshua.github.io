/*:
 * @target MZ
 * @plugindesc Prevents the player from entering tiles with specific Region IDs, acting as invisible walls.
 * @author Joshua
 *
 * @param Unpassable Regions
 * @type number[]
 * @default [1]
 * @desc List of Region IDs that should be unpassable to the player.
 *
 * @help
 * Tiles with the specified Region IDs will be completely unwalkable,
 * regardless of terrain tag or tile passability settings.
 */

(() => {
  const pluginName = "UnpassableRegions";
  const params = PluginManager.parameters(pluginName);
  const unpassableRegions = JSON.parse(params["Unpassable Regions"] || "[]").map(Number);

  const _Game_Player_canPass = Game_Player.prototype.canPass;
  Game_Player.prototype.canPass = function(x, y, d) {
    const newX = $gameMap.roundXWithDirection(x, d);
    const newY = $gameMap.roundYWithDirection(y, d);
    const regionId = $gameMap.regionId(newX, newY);

    if (unpassableRegions.includes(regionId)) {
      return false;
    }

    return _Game_Player_canPass.call(this, x, y, d);
  };
})();

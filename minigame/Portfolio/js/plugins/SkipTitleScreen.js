/*:
 * @target MZ
 * @plugindesc Skips the title screen and starts directly on the map.
 * @author Joshua
 */

(() => {
  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function () {
    _Scene_Boot_start.call(this);
    this.checkPlayerLocation(); // Make sure map/player is ready
    SceneManager.goto(Scene_Map);
  };
})();

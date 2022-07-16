/**
 * @description Calculate the falling delay by game level
 * @param {Number} level Current game level
 * @param {Number} startingMilliseconds
 * @returns {Number} The falling delay in milliseconds
 */
export function calculateFallingDelay(startingMilliseconds: number, level: number): number {
  return startingMilliseconds / level;
}
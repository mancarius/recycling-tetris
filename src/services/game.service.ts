import moment from "moment";

let levelCountdown: number = 0;
const interval = 1000 * 60 * 2; // 2 minutes
const levelCountdownDuration = moment.duration(interval);

/**
 * 
 */
function levelCountdownStart(): void {
  levelCountdown = setInterval(() => {
    levelCountdownDuration;
  });
}

/**
 * 
 */
function levelCountdownStop(): void {
  clearInterval(levelCountdown);
}

/**
 * Handle level countdown start and stop
 * 
 * @param {Boolean} run 
 */
export function levelCountdownHandler(run: boolean): void {
  if (run) levelCountdownStart();
  else levelCountdownStop();
}

/**
 * Calculate the falling delay by game level
 * 
 * @param {Number} level Current game level
 * @returns {Number} The falling delay in milliseconds
 */
export function calculateFallingDelay(level: number): number {
  const startingMilliseconds = 1000;
  return startingMilliseconds / level;
}
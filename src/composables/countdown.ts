import moment from "moment";
import { Ref, ref } from "vue";

interface Countdown {
  /** Time left */
  timeLeft: Ref<number>;
  /** Update countdown */
  refreshTime: () => void;
  /** Start countdown */
  start: () => void;
  /** Stop countdown */
  stop: () => void;
  /** Reset countdown */
  reset: () => void;
}


export function useCountdown(interval: number = 1000): Countdown {
  let levelCountdown: NodeJS.Timer;
  let levelCountdownDuration: moment.Duration = moment.duration(interval);
  const timeLeft: Ref<number> = ref(levelCountdownDuration.asMilliseconds());

  /** Update countdown */
  function refreshTime(): void {
    timeLeft.value = levelCountdownDuration.subtract(1000).asMilliseconds();
  }

  /** Start countdown */
  function start(): void {
    levelCountdown = setInterval(refreshTime, 1000);
  }

  /** Stop countdown */
  function stop(): void {
    clearInterval(levelCountdown);
  }

  /** Reset countdown */
  function reset(): void {
    levelCountdownDuration = moment.duration(interval);
  }

  return {
    timeLeft,
    refreshTime,
    start,
    stop,
    reset
  }
}

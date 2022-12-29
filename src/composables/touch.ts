import ControlKeys from "@/constants/enums/ControlKeys";
import { TouchEvents } from "@/constants/enums/TouchEvents";


/**
 * Returns the touch actions handlers
 *
 * @param param0
 * @returns
 */
export function useTouch({ actionStart, actionStop }: { actionStart: (actionCode: ControlKeys) => void, actionStop: () => void }): {
  onHold: (event: TouchEvent) => void;
  onRelease: () => void;
  onTap: (event: TouchEvent) => void;
  onDoubleTap: (event: TouchEvent) => void;
  onSwipe: (direction: string) => void;
} {
  let touchType: TouchEvents | null;

  /**
   * Activate the up/down action detection on swipe
   *
   * @param {String} direction
   */
  function onSwipe(direction: string) {
    touchType = TouchEvents.swipe;

    let actionCode: ControlKeys | null = null;

    switch (direction) {
      case "top":
        actionCode = ControlKeys.UP;
        break;
      case "bottom":
        actionCode = ControlKeys.SPACE;
        break;
      case "left":
        actionCode = ControlKeys.LEFT;
        break;
      case "right":
        actionCode = ControlKeys.RIGHT;
        break;
      default:
        actionCode = null;
    }

    actionCode && actionStart(actionCode);
    setTimeout(actionStop, 100);
  }

  /**
   * Activate the left/right action detection on old
   *
   * @param {TouchEvent} event
   */
  function onHold(event: TouchEvent) {
    touchType = TouchEvents.hold;

    const actionCode = getLeftRigthActionCode(event);

    actionCode && actionStart(actionCode);
  }

  /**
   * Activate the left/right action detection on single tap
   *
   * @param {TouchEvent} event
   */
  function onTap(event: TouchEvent) {
    touchType = TouchEvents.tap;

    const actionCode = getLeftRigthActionCode(event);

    actionCode && actionStart(actionCode);
    setTimeout(actionStop, 100);
  }

  function onDoubleTap(event: TouchEvent) {
    touchType = TouchEvents.tap;

    const actionCode = ControlKeys.SPACE;

    actionCode && actionStart(actionCode);
    setTimeout(actionStop, 100);
  }

  /** Call the action stop callback after the touch old event. */
  function onRelease() {
    if (touchType === TouchEvents.hold)
      actionStop();

    touchType = null;
  }


  return {
    onHold,
    onRelease,
    onTap,
    onSwipe,
    onDoubleTap
  }
}





/**
 *
 * @param {TouchEvent} event
 * @returns
 */
function getLeftRigthActionCode(event: TouchEvent) {
  const touch = event?.changedTouches?.[0];

  if (!touch) return;

  const target = touch.target as HTMLElement
  const { clientWidth } = target;
  const touchX = touch.clientX;
  // calcola la metà del client
  const clientHalfX = target.getBoundingClientRect().left + window.scrollX + (clientWidth / 2);

  return touchX < clientHalfX ? ControlKeys.LEFT : ControlKeys.RIGHT;
}

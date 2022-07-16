/**
 * @description Create a clone of the received object without keeping the reference
 * @param obj - The object to clone
 * @returns 
 */
function clone<T>(obj: T): T {
  if (typeof obj === "object") {
    const stringified = JSON.stringify(obj);
    return JSON.parse(stringified);
  }
  return obj;
}

export default clone;

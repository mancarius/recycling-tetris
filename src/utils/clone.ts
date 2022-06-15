function clone<T>(obj: T): T {
  if (typeof obj === "object") {
    const stringified = JSON.stringify(obj);
    return JSON.parse(stringified);
  }
  return obj;
}

export default clone;

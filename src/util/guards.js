export function safe(fn, fallBackType) {
  try {
    return fn();
  } catch (e) {
    if (e instanceof TypeError || e instanceof ReferenceError) {
      return fallBackType;
    } else {
      throw e;
    }
  }
}

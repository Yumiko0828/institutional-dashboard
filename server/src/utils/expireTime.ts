export function expireTime(t: number) {
  const now = new Date(),
    time = now.getTime(),
    expireTime = time + 1000 * t;
  now.setTime(expireTime);

  return now;
}

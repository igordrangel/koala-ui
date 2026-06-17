function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(id);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

/** Polls until width is stable (e.g. after CSS animations) or limits are hit. */
export async function resolveStableWidth(
  readWidth: () => number | undefined,
  signal: AbortSignal,
  fallback = 200,
): Promise<number> {
  let last = 0;
  let stable = 0;
  let best = fallback;

  for (let i = 0; i < 20 && !signal.aborted; i++) {
    try {
      await sleep(250, signal);
    } catch {
      return best;
    }

    const width = readWidth();
    if (!width) {
      stable = 0;
      continue;
    }

    best = Math.max(best, width);

    if (width >= 48 && Math.abs(width - last) < 1 && ++stable >= 2) {
      return width;
    }

    stable = width >= 48 ? 1 : 0;
    last = width;
  }

  return best;
}

import { diff, styleText } from 'node:util';

/**
 * Return a coloured diff between two values.
 * Nothing is written to the console; the caller decides when/if to log it.
 */
export function consoleDiff(a, b, { byLine = true } = {}) {
  const toSeq = (v) => {
    if (typeof v === 'object' && v !== null) v = JSON.stringify(v, null, 2);
    return byLine && typeof v === 'string' ? v.split('\n') : v;
  };

  const lines = [];

  for (const [op, chunk] of diff(toSeq(a), toSeq(b))) {
    switch (op) {
      case 0:  // unchanged
        lines.push(' ' + chunk);
        break;
      case 1:  // insert
        lines.push(styleText('green', '+' + chunk));
        break;
      case -1: // delete
        lines.push(styleText('red', '-' + chunk));
        break;
    }
  }
  return lines.join('\n');
}

import { consoleDiff } from '../../../utils/consoleDiff.js';

/**
 * Reverses the order of words in a string
 * @param {string} s - Input string containing words separated by spaces
 * @return {string} String with words in reverse order, single space separated
 */
function reverseWords(s) {
  // https://www.geeksforgeeks.org/reverse-words-in-a-given-string/
  // 0. Build buffer once – treated as our mutable “char array”
  const buf = Buffer.from(s, 'ascii');     // 1 byte per char under constraints

  /* ---------- ① collapse spaces ---------- */
  let write = 0, read = 0;
  // skip leading spaces
  while (read < buf.length && buf[read] === 0x20) read++;

  while (read < buf.length) {
    // copy non-space run
    while (read < buf.length && buf[read] !== 0x20)
      buf[write++] = buf[read++];
    // skip space run but leave exactly one space if more chars follow
    while (read < buf.length && buf[read] === 0x20) read++;
    if (read < buf.length) buf[write++] = 0x20;   // single separator
  }
  const n = write;        // effective “clean” length

  /* utility: in-place reverse of a slice [l, r] */
  const rev = (l, r) => {
    while (l < r) {
      const tmp = buf[l];
      buf[l++] = buf[r];
      buf[r--] = tmp;
    }
  };

  /* ---------- ② reverse whole buffer ---------- */
  rev(0, n - 1);

  /* ---------- ③ reverse each word ---------- */
  let start = 0;
  for (let i = 0; i <= n; ++i) {
    if (i === n || buf[i] === 0x20) {      // word boundary
      rev(start, i - 1);
      start = i + 1;
    }
  }

  /* ---------- result ---------- */
  return buf.toString('ascii', 0, n);
}

export { reverseWords };

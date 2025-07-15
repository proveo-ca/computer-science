const BASIC_COLORS = [
    { 'f00': 'red' },
    { '0f0': 'green' },
    { '00f': 'blue' }
];
const COMPOSITE_COLORS = [
    { '0ff': 'cyan' },
    { 'f0f': 'magenta' },
    { 'ff0': 'yellow' },
    { '000': 'key' }
];
const ALL_COLORS = [
    ...BASIC_COLORS,
    ...COMPOSITE_COLORS,
];
export { BASIC_COLORS, COMPOSITE_COLORS, ALL_COLORS };

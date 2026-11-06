function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export type ScaleMode =
  'ionian' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'aeolian' | 'locrian';
const patterns: Readonly<Record<ScaleMode, readonly number[]>> = {
  ionian: [0, 2, 4, 5, 7, 9, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  aeolian: [0, 2, 3, 5, 7, 8, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
};
export function scaleDegree(root: number, degree: number, mode: ScaleMode = 'ionian'): number {
  integer(root, 0, 127);
  integer(degree, 1, 71);
  if (!Object.hasOwn(patterns, mode)) throw new RangeError('Unknown mode');
  return integer(
    root + 12 * Math.floor((degree - 1) / 7) + patterns[mode][(degree - 1) % 7]!,
    0,
    127,
  );
}
export function scaleNotes(rootMidi: number, mode: ScaleMode = 'ionian', octaves = 1): number[] {
  integer(octaves, 1, 10);
  return Array.from({ length: 7 * octaves + 1 }, (_, i) => scaleDegree(rootMidi, i + 1, mode));
}

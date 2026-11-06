import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('major mode', () => {
  assert.deepEqual(api.scaleNotes(60), [60, 62, 64, 65, 67, 69, 71, 72]);
});
test('dorian mode', () => {
  assert.deepEqual(api.scaleNotes(60, 'dorian'), [60, 62, 63, 65, 67, 69, 70, 72]);
});
test('lydian fourth', () => {
  assert.equal(api.scaleDegree(60, 4, 'lydian'), 66);
});
test('octave degrees', () => {
  assert.equal(api.scaleDegree(60, 8), 72);
  assert.equal(api.scaleNotes(48, 'aeolian', 2).length, 15);
});
test('invalid mode and MIDI', () => {
  assert.throws(() => api.scaleNotes(120));
  assert.throws(() => api.scaleNotes(60, 'constructor'));
  assert.throws(() => api.scaleDegree(60, 0));
});
test('all mode step sums', () => {
  for (const mode of [
    'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian',
  ]) {
    const a = api.scaleNotes(0, mode);
    assert.equal(a.at(-1), 12);
    assert.ok(a.slice(1).every((n, i) => n > a[i] && n - a[i] <= 2));
  }
});

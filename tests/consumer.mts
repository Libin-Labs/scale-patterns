import { scaleNotes, scaleDegree } from '@lp-labs/scale-patterns';
if (scaleNotes(60).length !== 8 || scaleDegree(60, 8) !== 72) throw new Error('Scale');
// @ts-expect-error invalid argument must be rejected by declarations
scaleNotes(60, 'unknown');

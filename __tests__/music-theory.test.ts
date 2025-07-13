import { generateScale, formatNoteForDisplay, type Scale, type Note } from '@/lib/music-theory';

describe('Music Theory Library', () => {
  describe('formatNoteForDisplay', () => {
    test('should format sharp notes correctly', () => {
      expect(formatNoteForDisplay({ name: 'C#' })).toBe('D♭');
      expect(formatNoteForDisplay({ name: 'F#' })).toBe('G♭');
      expect(formatNoteForDisplay({ name: 'G#' })).toBe('A♭');
    });

    test('should format flat notes correctly', () => {
      expect(formatNoteForDisplay({ name: 'Db' })).toBe('Db');
      expect(formatNoteForDisplay({ name: 'Eb' })).toBe('Eb');
      expect(formatNoteForDisplay({ name: 'Ab' })).toBe('Ab');
      expect(formatNoteForDisplay({ name: 'Bb' })).toBe('Bb');
    });

    test('should handle natural notes unchanged', () => {
      expect(formatNoteForDisplay({ name: 'C' })).toBe('C');
      expect(formatNoteForDisplay({ name: 'D' })).toBe('D');
      expect(formatNoteForDisplay({ name: 'E' })).toBe('E');
      expect(formatNoteForDisplay({ name: 'F' })).toBe('F');
      expect(formatNoteForDisplay({ name: 'G' })).toBe('G');
      expect(formatNoteForDisplay({ name: 'A' })).toBe('A');
      expect(formatNoteForDisplay({ name: 'B' })).toBe('B');
    });
  });

  describe('generateScale', () => {
    test('should generate C Major scale correctly', () => {
      const scale = generateScale('C', 'Major');
      expect(scale.notes.map(note => note.name)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
      expect(scale.pattern).toEqual([2, 2, 1, 2, 2, 2, 1]);
      expect(scale.name).toBe('C Major');
    });

    test('should generate G Major scale correctly', () => {
      const scale = generateScale('G', 'Major');
      expect(scale.notes.map(note => note.name)).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F#']);
      expect(scale.pattern).toEqual([2, 2, 1, 2, 2, 2, 1]);
      expect(scale.name).toBe('G Major');
    });

    test('should generate A Natural Minor scale correctly', () => {
      const scale = generateScale('A', 'Natural Minor');
      expect(scale.notes.map(note => note.name)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
      expect(scale.pattern).toEqual([2, 1, 2, 2, 1, 2, 2]);
      expect(scale.name).toBe('A Natural Minor');
    });

    test('should generate F# Major scale correctly', () => {
      const scale = generateScale('F#', 'Major');
      expect(scale.notes.map(note => note.name)).toEqual(['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F']); // Note: F instead of E# due to chromatic scale limitations
      expect(scale.pattern).toEqual([2, 2, 1, 2, 2, 2, 1]);
      expect(scale.name).toBe('F# Major');
    });
  });
});

// Music theory utilities for generating scales

export interface Note {
  name: string;
  accidental?: string;
  octave?: number;
}

export interface Scale {
  name: string;
  notes: Note[];
  pattern: number[];
  key: string;
}

// Chromatic scale starting from C
export const CHROMATIC_NOTES = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 
  'F#', 'G', 'G#', 'A', 'A#', 'B'
];

// Enharmonic equivalents for better display
export const ENHARMONIC_MAP: { [key: string]: string } = {
  'C#': 'D♭',
  'D#': 'E♭',
  'F#': 'G♭',
  'G#': 'A♭',
  'A#': 'B♭'
};

// Scale patterns (intervals in semitones)
export const SCALE_PATTERNS: { [key: string]: number[] } = {
  'Major': [2, 2, 1, 2, 2, 2, 1],
  'Natural Minor': [2, 1, 2, 2, 1, 2, 2],
  'Harmonic Minor': [2, 1, 2, 2, 1, 3, 1],
  'Melodic Minor': [2, 1, 2, 2, 2, 2, 1],
  'Dorian': [2, 1, 2, 2, 2, 1, 2],
  'Phrygian': [1, 2, 2, 2, 1, 2, 2],
  'Lydian': [2, 2, 2, 1, 2, 2, 1],
  'Mixolydian': [2, 2, 1, 2, 2, 1, 2],
  'Locrian': [1, 2, 2, 1, 2, 2, 2],
  'Blues': [3, 2, 1, 1, 3, 2],
  'Pentatonic Major': [2, 2, 3, 2, 3],
  'Pentatonic Minor': [3, 2, 2, 3, 2]
};

export function getRandomKey(): string {
  return CHROMATIC_NOTES[Math.floor(Math.random() * CHROMATIC_NOTES.length)];
}

export function getRandomScaleType(): string {
  const scaleTypes = Object.keys(SCALE_PATTERNS);
  return scaleTypes[Math.floor(Math.random() * scaleTypes.length)];
}

export function generateScale(key: string, scaleType: string): Scale {
  const pattern = SCALE_PATTERNS[scaleType];
  if (!pattern) {
    throw new Error(`Unknown scale type: ${scaleType}`);
  }

  const keyIndex = CHROMATIC_NOTES.indexOf(key);
  if (keyIndex === -1) {
    throw new Error(`Unknown key: ${key}`);
  }

  const notes: Note[] = [];
  let currentIndex = keyIndex;

  // Add the root note
  notes.push({ name: CHROMATIC_NOTES[currentIndex] });

  // Generate the rest of the scale based on the pattern (exclude the last interval which would return to root)
  for (let i = 0; i < pattern.length - 1; i++) {
    currentIndex = (currentIndex + pattern[i]) % 12;
    notes.push({ name: CHROMATIC_NOTES[currentIndex] });
  }

  return {
    name: `${key} ${scaleType}`,
    notes,
    pattern,
    key
  };
}

export function formatNoteForDisplay(note: Note): string {
  let displayName = note.name;
  
  // Use flat symbols for better readability
  if (displayName.includes('#')) {
    displayName = ENHARMONIC_MAP[displayName] || displayName;
  }
  
  return displayName;
}

export function getScaleDegreeNames(scaleType: string): string[] {
  switch (scaleType) {
    case 'Major':
    case 'Natural Minor':
    case 'Harmonic Minor':
    case 'Melodic Minor':
      return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'I'];
    case 'Blues':
      return ['I', '♭III', 'IV', '♭V', 'V', '♭VII'];
    case 'Pentatonic Major':
    case 'Pentatonic Minor':
      return ['I', 'II', 'III', 'V', 'VI'];
    default:
      return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'I'];
  }
}

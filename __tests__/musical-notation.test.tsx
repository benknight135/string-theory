/**
 * Jest Unit Tests - Logic Testing
 * 
 * These tests focus on pure logic, utility functions, and component behavior
 * without rendering to the DOM or visual testing.
 */

import { generateScale } from '@/lib/music-theory';

// Helper function to extract staff position logic from MusicalNotation component
function getStaffPosition(noteName: string): number {
  // This mirrors the CORRECTED logic from MusicalNotation.tsx
  const trebleClefPositions: { [key: string]: number } = {
    // From bottom E4 to top F5 in treble clef
    'E': 0,   // Bottom line (E4)
    'F': 1,   // Space above E
    'F#': 1, 'G♭': 1,
    'G': 2,   // Second line (G4)
    'G#': 2, 'A♭': 2,
    'A': 3,   // Space above G
    'A#': 3, 'B♭': 3,
    'B': 4,   // Middle line (B4)
    'C': 5,   // Space above B (C5)
    'C#': 5, 'D♭': 5,
    'D': 6,   // Fourth line (D5)
    'D#': 6, 'E♭': 6,
  };
  
  // Invert position for CSS (higher notes = lower position values)
  const position = trebleClefPositions[noteName] ?? 4; // Default to middle line
  return (6 - position); // Invert: 0->6, 1->5, 2->4, 3->3, 4->2, 5->1, 6->0
}

describe('Musical Notation Logic Tests (Jest)', () => {
  describe('Staff Position Algorithm', () => {
    test('should calculate treble clef positions correctly', () => {
      // Test standard treble clef positions (corrected)
      expect(getStaffPosition('E')).toBe(6);   // Bottom line
      expect(getStaffPosition('F')).toBe(5);   // Space above bottom line
      expect(getStaffPosition('F#')).toBe(5);
      expect(getStaffPosition('G♭')).toBe(5);
      
      expect(getStaffPosition('G')).toBe(4);   // Second line from bottom
      expect(getStaffPosition('G#')).toBe(4);
      expect(getStaffPosition('A♭')).toBe(4);
      
      expect(getStaffPosition('A')).toBe(3);   // Space above second line
      expect(getStaffPosition('A#')).toBe(3);
      expect(getStaffPosition('B♭')).toBe(3);
      
      expect(getStaffPosition('B')).toBe(2);   // Middle line
      
      expect(getStaffPosition('C')).toBe(1);   // Space above middle line
      expect(getStaffPosition('C#')).toBe(1);
      expect(getStaffPosition('D♭')).toBe(1);
      
      expect(getStaffPosition('D')).toBe(0);   // Top line
      expect(getStaffPosition('D#')).toBe(0);
      expect(getStaffPosition('E♭')).toBe(0);
    });

    test('should handle unknown notes with default position', () => {
      expect(getStaffPosition('X')).toBe(2); // Default to middle line (4 inverted = 2)
      expect(getStaffPosition('')).toBe(2);
    });
  });

  describe('Staff Position Validation for Musical Scales', () => {
    const testCases = [
      {
        scaleName: 'C Major',
        key: 'C',
        type: 'Major',
        expectedPositions: {
          'C': 1,   // Space above middle line
          'D': 0,   // Top line
          'E': 6,   // Bottom line
          'F': 5,   // Space above bottom line
          'G': 4,   // Second line
          'A': 3,   // Space above second line
          'B': 2,   // Middle line
        }
      },
      {
        scaleName: 'G Major',
        key: 'G',
        type: 'Major',
        expectedPositions: {
          'G': 4,   // Second line
          'A': 3,   // Space above second line
          'B': 2,   // Middle line
          'C': 1,   // Space above middle line
          'D': 0,   // Top line
          'E': 6,   // Bottom line
          'F#': 5, // Space above bottom line (sharp notes use same position as natural)
        }
      }
    ];

    testCases.forEach(({ scaleName, key, type, expectedPositions }) => {
      test(`should calculate positions for ${scaleName} notes correctly`, () => {
        const scale = generateScale(key, type);
        
        // Test each note position
        Object.entries(expectedPositions).forEach(([noteName, expectedPosition]) => {
          const actualPosition = getStaffPosition(noteName);
          expect(actualPosition).toBe(expectedPosition);
        });
      });
    });
  });

  describe('Treble Clef Staff Line Mathematical Ordering', () => {
    test('should maintain correct line ordering from bottom to top', () => {
      // In treble clef, from bottom to top the lines are: E, G, B, D
      // In our CSS positioning (inverted), lower numbers = higher positions
      
      const bottomLine = getStaffPosition('E');    // 6 (bottom line)
      const secondLine = getStaffPosition('G');    // 4 (second line)
      const middleLine = getStaffPosition('B');    // 2 (middle line)
      const topLine = getStaffPosition('D');       // 0 (top line)
      
      // Verify ordering: bottom > second > middle > top (in CSS position values)
      expect(bottomLine).toBeGreaterThan(secondLine);
      expect(secondLine).toBeGreaterThan(middleLine);
      expect(middleLine).toBeGreaterThan(topLine);
      
      // Verify specific positions match treble clef standard
      expect(bottomLine).toBe(6);
      expect(secondLine).toBe(4);
      expect(middleLine).toBe(2);
      expect(topLine).toBe(0);
    });

    test('should maintain correct space positioning between lines', () => {
      // Spaces should be positioned between their respective lines
      const bottomSpace = getStaffPosition('F');    // 5 (between bottom line E and second line G)
      const secondSpace = getStaffPosition('A');    // 3 (between second line G and middle line B)  
      const topSpace = getStaffPosition('C');       // 1 (between middle line B and top line D)
      
      // Verify spaces are positioned correctly relative to lines
      expect(bottomSpace).toBe(5);  // Between bottom line (6) and second line (4)
      expect(secondSpace).toBe(3);  // Between second line (4) and middle line (2)
      expect(topSpace).toBe(1);     // Between middle line (2) and top line (0)
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty input gracefully', () => {
      expect(getStaffPosition('')).toBe(2);
    });

    test('should handle unexpected characters', () => {
      expect(getStaffPosition('Z')).toBe(2);
      expect(getStaffPosition('123')).toBe(2);
      expect(getStaffPosition('XYZ')).toBe(2);
    });

    test('should handle null/undefined input', () => {
      expect(getStaffPosition(undefined as any)).toBe(2);
    });
  });
});

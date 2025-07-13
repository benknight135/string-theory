'use client';

import { Scale, formatNoteForDisplay, getScaleDegreeNames } from '@/lib/music-theory';

interface MusicalNotationProps {
  scale: Scale;
}

export default function MusicalNotation({ scale }: MusicalNotationProps) {
  const scaleDegrees = getScaleDegreeNames(scale.name.split(' ').slice(1).join(' '));

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{scale.name}</h2>
        <p className="text-gray-600">Scale Pattern: {scale.pattern.join(' - ')}</p>
      </div>

      {/* Staff Lines - Professional Music Notation */}
      <div className="relative mb-16 overflow-x-auto bg-white">
        <div className="min-w-[800px] lg:min-w-0 mx-auto max-w-4xl">
          {/* Treble clef and staff container */}
          <div className="relative h-48 py-8">
            {/* The five staff lines */}
            <div className="absolute inset-x-0 flex flex-col justify-between h-16 top-16">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-px bg-gray-900 w-full"></div>
              ))}
            </div>

            {/* Treble clef */}
            <div className="absolute left-4 top-12 text-4xl text-gray-900 font-serif">
              𝄞
            </div>

            {/* Notes positioned on the staff */}
            <div className="absolute inset-0 flex items-start justify-center">
              <div className="flex space-x-12 ml-16 mt-4">
                {scale.notes.map((note, index) => {
                  // Calculate note position on staff based on note name
                  const getStaffPosition = (noteName: string) => {
                    // Standard treble clef positions - lines are 0, 2, 4, 6, 8 (counting from bottom)
                    // Spaces are 1, 3, 5, 7, 9
                    // We need to invert for CSS positioning (0 = top)
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
                  };

                  const staffPosition = getStaffPosition(formatNoteForDisplay(note));
                  const noteTop = staffPosition * 4; // 4px per staff position
                  
                  return (
                    <div key={index} className="relative flex flex-col items-center">
                      {/* Note positioned on correct staff line/space */}
                      <div className="relative" style={{ top: `${noteTop}px` }}>
                        {/* Quarter note */}
                        <div className="relative">
                          {/* Note head - proper oval shape */}
                          <div 
                            className="w-4 h-3 bg-gray-900 relative"
                            style={{
                              borderRadius: '50%',
                              transform: 'rotate(-20deg)'
                            }}
                          ></div>
                          {/* Stem */}
                          <div className="absolute right-0 -top-5 w-0.5 h-5 bg-gray-900"></div>
                        </div>
                        
                        {/* Ledger line if note is outside staff */}
                        {(staffPosition < 0 || staffPosition > 6) && (
                          <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-6 h-px bg-gray-900"></div>
                        )}
                      </div>
                      
                      {/* Note name and scale degree below staff */}
                      <div className="absolute top-32 text-center min-w-[3rem]">
                        <div className="text-lg font-bold text-gray-800 mb-1">
                          {formatNoteForDisplay(note)}
                        </div>
                        {index < scaleDegrees.length && (
                          <div className="text-sm text-blue-600 font-medium">
                            {scaleDegrees[index]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* End bar line */}
            <div className="absolute right-4 top-16 h-16 flex">
              <div className="w-px h-full bg-gray-900 mr-1"></div>
              <div className="w-1 h-full bg-gray-900"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scale Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Scale Notes</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {scale.notes.map((note, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
              >
                {formatNoteForDisplay(note)}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Intervals</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {scale.pattern.map((interval, index) => (
              <span 
                key={index}
                className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
              >
                {interval === 1 ? 'H' : interval === 2 ? 'W' : `${interval}H`}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">H = Half step, W = Whole step</p>
        </div>
      </div>

      {/* Practice Tips */}
      <div className="mt-4 sm:mt-6 bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
        <h3 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">💡 Practice Tips</h3>
        <ul className="text-xs sm:text-sm text-amber-700 space-y-1">
          <li>• Practice playing this scale ascending and descending</li>
          <li>• Try playing it in different octaves</li>
          <li>• Focus on the fingering patterns</li>
          <li>• Listen to the characteristic sound of this scale</li>
        </ul>
      </div>
    </div>
  );
}

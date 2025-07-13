'use client';

import { useState, useCallback } from 'react';
import { Scale, generateScale, getRandomKey, getRandomScaleType, SCALE_PATTERNS } from '@/lib/music-theory';
import MusicalNotation from '@/components/MusicalNotation';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';

export default function Home() {
  const [currentScale, setCurrentScale] = useState<Scale | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateRandomScale = useCallback(() => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      const randomKey = getRandomKey();
      const randomScaleType = getRandomScaleType();
      const scale = generateScale(randomKey, randomScaleType);
      setCurrentScale(scale);
      setIsGenerating(false);
    }, 500);
  }, [isGenerating]);

  const generateSpecificScale = (key: string, scaleType: string) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const scale = generateScale(key, scaleType);
      setCurrentScale(scale);
      setIsGenerating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🎵 String Theory
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Random Music Scale Generator
          </p>
          <p className="text-gray-500">
            Perfect for music theory practice and exploration
          </p>
        </div>

        {/* Control Panel */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={generateRandomScale}
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  '🎲 Generate Random Scale'
                )}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              </button>
            </div>
            
            <div className="text-center mt-2 text-xs text-gray-500">
              💡 Tip: Press <kbd className="bg-gray-200 px-1 rounded">Space</kbd> or <kbd className="bg-gray-200 px-1 rounded">R</kbd> for random scale
            </div>
          </div>
        </div>

        {/* Advanced Scale Selection - Collapsible */}
        {showAdvanced && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Choose Specific Scale Type</h3>
              
              {/* Popular Scales */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">Popular Scales</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {['Major', 'Natural Minor', 'Pentatonic Major', 'Pentatonic Minor', 'Blues', 'Dorian'].map((scaleType) => (
                    <button
                      key={scaleType}
                      onClick={() => generateSpecificScale(getRandomKey(), scaleType)}
                      disabled={isGenerating}
                      className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 py-2 px-3 rounded-md transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {scaleType}
                    </button>
                  ))}
                </div>
              </div>

              {/* All Scale Types */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">All Scale Types</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {Object.keys(SCALE_PATTERNS).map((scaleType) => (
                    <button
                      key={scaleType}
                      onClick={() => generateSpecificScale(getRandomKey(), scaleType)}
                      disabled={isGenerating}
                      className="bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 py-2 px-3 rounded-md transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {scaleType}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Scale Display */}
        {currentScale && (
          <div className="max-w-6xl mx-auto">
            <MusicalNotation scale={currentScale} />
          </div>
        )}

        {/* Initial Message */}
        {!currentScale && !isGenerating && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-12 border-2 border-gray-200">
              <div className="text-6xl mb-6">🎼</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to String Theory!
              </h2>
              <p className="text-gray-600 mb-6">
                Click the button above to generate a random music scale for practice and study. 
                Perfect for musicians, students, and anyone interested in music theory.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-500">
                <div>
                  <div className="text-2xl mb-2">🎹</div>
                  <div className="font-medium text-gray-700">Practice Tool</div>
                  <div>Great for piano, guitar, and all instruments</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-medium text-gray-700">Learn Theory</div>
                  <div>Understand scale patterns and intervals</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">🎵</div>
                  <div className="font-medium text-gray-700">Explore Music</div>
                  <div>Discover new scales and their sounds</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Keyboard Shortcuts Helper */}
      <KeyboardShortcuts onGenerateRandomScale={generateRandomScale} />
    </div>
  );
}

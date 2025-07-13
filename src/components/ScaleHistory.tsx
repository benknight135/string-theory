'use client';

import { Scale, formatNoteForDisplay } from '@/lib/music-theory';

interface ScaleHistoryProps {
  scales: Scale[];
  onSelectScale: (scale: Scale) => void;
  onClearHistory: () => void;
}

export default function ScaleHistory({ scales, onSelectScale, onClearHistory }: ScaleHistoryProps) {
  if (scales.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Scales</h3>
          <button
            onClick={onClearHistory}
            className="text-sm text-red-600 hover:text-red-800 underline"
          >
            Clear History
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {scales.slice(-6).reverse().map((scale, index) => (
            <button
              key={`${scale.name}-${index}`}
              onClick={() => onSelectScale(scale)}
              className="text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-blue-300"
            >
              <div className="font-medium text-gray-800 mb-1">{scale.name}</div>
              <div className="text-sm text-gray-600">
                {scale.notes.slice(0, 4).map(note => formatNoteForDisplay(note)).join(' - ')}
                {scale.notes.length > 4 && ' ...'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

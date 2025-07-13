'use client';

import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onGenerateRandomScale: () => void;
}

export default function KeyboardShortcuts({ onGenerateRandomScale }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if user is typing in an input field
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Spacebar or 'r' key to generate random scale
      if (event.code === 'Space' || event.key.toLowerCase() === 'r') {
        event.preventDefault();
        onGenerateRandomScale();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onGenerateRandomScale]);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
      <div className="flex flex-col gap-1">
        <div><kbd className="bg-white/20 px-1 rounded">Space</kbd> or <kbd className="bg-white/20 px-1 rounded">R</kbd> - Random Scale</div>
      </div>
    </div>
  );
}

import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">N</span>
      </div>
      <span className="text-primary font-bold text-xl">Need1</span>
    </div>
  );
}
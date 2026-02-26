'use client';

import { useState, useEffect } from 'react';

interface LoadingDNAProps {
  messages?: string[];
  interval?: number;
  className?: string;
}

const defaultMessages = [
  "Initializing cosmic scanner...",
  "Analyzing musical frequencies...",
  "Mapping your sonic DNA...",
  "Connecting to the Spotify nebula...",
  "Extracting audio features...",
  "Calculating your taste constellation...",
  "Processing temporal listening patterns...",
  "Synthesizing your musical genome...",
  "Aligning with the cosmic frequency...",
  "Generating your unique TastePrint...",
  "Almost there... the universe is computing...",
  "Finalizing your cosmic musical identity...",
];

export default function LoadingDNA({ 
  messages = defaultMessages, 
  interval = 3000,
  className = '' 
}: LoadingDNAProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, interval);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (messages.length * (interval / 1000)));
      });
    }, 100);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [messages, interval]);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* DNA Helix Animation */}
      <div className="relative w-32 h-48 mb-8">
        {/* Double helix strands */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Left strand */}
          <div className="absolute left-4 top-0 w-2 h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`left-${i}`}
                className="absolute w-3 h-3 rounded-full bg-[#4ECDC4]"
                style={{
                  top: `${(i / 8) * 100}%`,
                  animation: `dna-float 2s ease-in-out ${i * 0.25}s infinite`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
          
          {/* Right strand */}
          <div className="absolute right-4 top-0 w-2 h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`right-${i}`}
                className="absolute w-3 h-3 rounded-full bg-[#6C5CE7]"
                style={{
                  top: `${(i / 8) * 100}%`,
                  animation: `dna-float 2s ease-in-out ${i * 0.25 + 0.5}s infinite`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>

          {/* Connecting lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`connector-${i}`}
              className="absolute h-px bg-gradient-to-r from-[#4ECDC4] to-[#6C5CE7]"
              style={{
                width: '60%',
                left: '20%',
                top: `${(i / 8) * 100 + 6}%`,
                animation: `dna-connect 2s ease-in-out ${i * 0.25}s infinite`,
                opacity: 0.5,
              }}
            />
          ))}
        </div>

        {/* Scanner beam */}
        <div 
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent"
          style={{
            animation: 'scanner-beam 2s linear infinite',
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-gray-800 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#4ECDC4] via-[#6C5CE7] to-[#FFD93D] rounded-full transition-all duration-100"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading message */}
      <div className="text-center max-w-md px-4">
        <p className="text-lg font-medium text-white mb-2">
          {messages[currentIndex]}
        </p>
        <p className="text-sm text-gray-400">
          Scanning your musical DNA...
        </p>
      </div>

      <style jsx>{`
        @keyframes dna-float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }
        
        @keyframes dna-connect {
          0%, 100% {
            opacity: 0.3;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 0.8;
            transform: scaleX(1);
          }
        }
        
        @keyframes scanner-beam {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

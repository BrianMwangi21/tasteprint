'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ZineBackground, InkDistortionFilter } from '@/components/zine/ZineElements';

export default function AnalyzePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "INTERCEPTING SIGNAL...",
    "CRACKING AUDIO ENCRYPTION...",
    "DEVELOPING NEGATIVES...",
    "SCANNING MUSICAL DNA...",
    "EXTRACTING SONIC ARTIFACTS...",
    "FINALIZING MANIFESTO...",
  ];

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    const createAnalysis = async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to create analysis');
        }

        const data = await response.json();
        
        if (data.redirectUrl) {
          router.push(data.redirectUrl);
        } else {
          throw new Error('No redirect URL received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    createAnalysis();
    return () => clearInterval(msgInterval);
  }, [router, messages.length]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#e8e4db] flex items-center justify-center px-4 font-mono">
        <ZineBackground />
        <div className="zine-card p-12 text-center space-y-6 max-w-md bg-white">
          <div className="text-6xl">⚠️</div>
          <h2 className="font-shade text-3xl text-[#ff3e3e]">BREACH FAILED</h2>
          <p className="font-elite text-lg opacity-70">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-[#1a1a1a] text-white font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
          >
            RETURN TO BASE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e4db] flex flex-col items-center justify-center px-4 relative overflow-hidden font-mono">
      <ZineBackground />
      <InkDistortionFilter />

      {/* Xerox Scanning Bar Effect */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <div className="absolute top-0 left-0 w-full h-[15vh] bg-white opacity-40 blur-xl animate-[xerox-scan_3s_linear_infinite]" />
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-80 animate-[xerox-scan_3s_linear_infinite]" />
      </div>

      <style>{`
        @keyframes xerox-scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-12">
        <div className="zine-card p-12 md:p-20 bg-white transform -rotate-1">
          <div className="space-y-8">
            <div className="font-glitch text-4xl md:text-6xl text-[#ff3e3e] animate-pulse">
              ANALYZING...
            </div>
            
            <div className="h-2 w-full bg-black/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-black transition-all duration-500 w-full animate-[loading-bar_10s_ease-in-out_infinite]" />
            </div>

            <div className="font-shade text-2xl md:text-4xl tracking-tighter italic min-h-[3rem]">
              {messages[messageIndex]}
            </div>
          </div>
        </div>

        <p className="font-elite text-sm opacity-40 max-w-sm mx-auto uppercase tracking-widest">
          DO NOT REFRESH. THE REVOLUTION IS BEING DIGITIZED.
        </p>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

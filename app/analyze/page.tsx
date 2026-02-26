'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingDNA from '@/components/ui/LoadingDNA';
import { RadarUI } from '@/components/ui/ScannerRadar';

export default function AnalyzePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        
        // Redirect to the public analysis page
        if (data.redirectUrl) {
          router.push(data.redirectUrl);
        } else {
          throw new Error('No redirect URL received');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    createAnalysis();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-8 max-w-md">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-[#4ECDC4] text-white rounded-full font-semibold hover:bg-[#3DBDB4] transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Radar background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <RadarUI active={isLoading} className="w-[600px] h-[600px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <LoadingDNA 
          messages={[
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
          ]}
          interval={2500}
          className="scale-125"
        />

        {/* Fun fact */}
        <div className="mt-12 text-center max-w-lg mx-auto">
          <p className="text-gray-500 text-sm italic">
            Did you know? We're analyzing up to 50 of your top tracks, 
            50 recently played songs, and extracting detailed audio features 
            to create your unique visualization.
          </p>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FeedResponse, FeedItem } from '@/types';
import { ZineBackground, InkDistortionFilter, TapeStrip } from '@/components/zine/ZineElements';

export default function FeedPage() {
  const [feedData, setFeedData] = useState<FeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/feed?page=${currentPage}&limit=12`);
        
        if (!response.ok) {
          throw new Error('Failed to load feed');
        }
        
        const data = await response.json();
        setFeedData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8e4db] flex items-center justify-center font-mono">
        <ZineBackground />
        <div className="text-center space-y-4 animate-pulse">
          <div className="font-glitch text-4xl text-[#ff3e3e]">SEARCHING...</div>
          <div className="font-shade text-xl italic uppercase">Scanning the underground</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#e8e4db] flex items-center justify-center px-4 font-mono">
        <ZineBackground />
        <div className="zine-card p-12 text-center space-y-6 max-w-md bg-white">
          <div className="text-6xl">📡</div>
          <h2 className="font-shade text-3xl text-[#ff3e3e]">SIGNAL LOST</h2>
          <p className="font-elite text-lg opacity-70">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-[#1a1a1a] text-white font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
          >
            RETRY SCAN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e4db] text-[#1a1a1a] font-mono overflow-x-hidden selection:bg-[#ff3e3e] selection:text-white relative">
      <ZineBackground />
      <InkDistortionFilter />

      {/* Header */}
      <header className="relative z-20 px-4 sm:px-6 lg:px-8 py-8 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-baseline gap-2">
            <h1 className="text-3xl font-shade tracking-tighter group-hover:text-[#ff3e3e] transition-colors">
              TASTEPRINT
            </h1>
            <span className="font-mono text-[8px] font-black uppercase opacity-40">Discovery Feed</span>
          </Link>
          
          <Link
            href="/"
            className="px-6 py-2 bg-[#ff3e3e] text-white font-black text-sm uppercase zine-card hover:bg-black transition-all"
          >
            CREATE YOURS
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <h2 className="font-shade text-5xl md:text-8xl tracking-tighter ink-smear" style={{ filter: 'url(#ink-distortion)' }}>
          SONIC<br/>CLASSIFIEDS
        </h2>
        <div className="max-w-2xl mx-auto p-4 zine-card bg-[#fbff00] transform -rotate-1">
          <p className="font-elite text-xl md:text-2xl font-bold">
            Public records of audio frequencies intercepted from across the void.
          </p>
        </div>
      </div>

      {/* Feed Grid */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 pb-48">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {feedData?.items.map((item) => (
              <AnalysisCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          {feedData && feedData.pagination.totalPages > 1 && (
            <div className="mt-24 flex items-center justify-center gap-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={!feedData.pagination.hasPrev}
                className={`px-8 py-4 zine-card font-black uppercase text-sm transition-all ${
                  feedData.pagination.hasPrev
                    ? 'bg-white hover:bg-[#ff3e3e] hover:text-white'
                    : 'bg-white opacity-30 cursor-not-allowed'
                }`}
              >
                PREVIOUS
              </button>
              
              <div className="font-shade text-3xl">
                PAGE {currentPage}
              </div>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={!feedData.pagination.hasNext}
                className={`px-8 py-4 zine-card font-black uppercase text-sm transition-all ${
                  feedData.pagination.hasNext
                    ? 'bg-white hover:bg-[#ff3e3e] hover:text-white'
                    : 'bg-white opacity-30 cursor-not-allowed'
                }`}
              >
                NEXT
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 text-center">
             <span className="marker-yellow font-mono text-[10px] font-black uppercase px-2">
               Displaying {feedData?.items.length} of {feedData?.pagination.totalItems} intercepted reports
             </span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 py-8 px-4 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <Link
            href="/"
            className="px-12 py-6 bg-black text-white font-black text-2xl uppercase zine-card hover:bg-[#ff3e3e] transition-all shadow-2xl pointer-events-auto"
          >
            ! JOIN THE REVOLUTION
          </Link>
        </div>
      </div>
    </div>
  );
}

function AnalysisCard({ item }: { item: FeedItem }) {
  return (
    <Link href={`/taste/${item.id}`} className="group">
      <div className="zine-card p-0 bg-white overflow-hidden transform group-hover:rotate-1 transition-all h-full flex flex-col">
        {/* Tape Header */}
        <div className="relative h-8 bg-black/5 border-b-2 border-black flex items-center px-4">
           <TapeStrip className="-top-2 left-1/2 -translate-x-1/2 scale-50 opacity-40" />
           <div className="font-mono text-[8px] font-black opacity-40 uppercase">Report_ID: {item.id}</div>
        </div>

        <div className="p-8 space-y-6 flex-1 flex flex-col">
          {/* User Info */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-glitch text-2xl md:text-3xl text-red-600 truncate group-hover:tracking-widest transition-all">
                {item.user.displayName.toUpperCase()}
              </h3>
              <p className="font-mono text-[10px] opacity-40 uppercase font-black">
                Processed: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
            {item.user.images?.[0] ? (
              <img
                src={item.user.images[0].url}
                alt={item.user.displayName}
                className="w-16 h-16 border-4 border-black grayscale group-hover:grayscale-0 transition-all"
              />
            ) : (
              <div className="w-16 h-16 bg-[#fbff00] border-4 border-black flex items-center justify-center font-shade text-3xl">
                ?
              </div>
            )}
          </div>

          <div className="h-px w-full bg-black/10" />

          {/* Preview Stats */}
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <span className="font-mono text-[8px] font-black opacity-40 uppercase">Primary Frequency</span>
              <div className="font-marker text-xl uppercase text-black">{item.preview.topGenre}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[8px] font-black opacity-40 uppercase">Objects</span>
                <div className="font-shade text-2xl">{item.preview.trackCount}</div>
              </div>
              <div className="space-y-1 text-right">
                <span className="font-mono text-[8px] font-black opacity-40 uppercase">Mood</span>
                <div className="font-shade text-2xl text-blue-600">{item.preview.dominantMood.toUpperCase()}</div>
              </div>
            </div>
          </div>

          {/* View Count */}
          <div className="pt-6 mt-auto border-t-4 border-dashed border-black/10 flex items-center justify-between">
            <div className="font-mono text-[10px] font-black bg-[#fbff00] px-2">{item.viewCount} WITNESSES</div>
            <span className="font-shade text-lg group-hover:translate-x-2 transition-transform">
              DECRYPT →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

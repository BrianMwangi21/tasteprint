'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FeedResponse, FeedItem } from '@/types';
import { CosmicText, GlowingText } from '@/components/ui/CosmicTypography';
import { RadarUI } from '@/components/ui/ScannerRadar';

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
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center">
          <RadarUI active={true} className="w-48 h-48 mx-auto mb-6" />
          <p className="text-gray-400">Loading cosmic discoveries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">🌌</div>
          <h2 className="text-2xl font-bold text-white mb-4">Failed to load feed</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#4ECDC4] text-white rounded-full font-semibold hover:bg-[#3DBDB4] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Header */}
      <header className="relative z-20 px-4 sm:px-6 lg:px-8 py-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            <GlowingText color="#4ECDC4">Taste</GlowingText>
            <span>Print</span>
          </Link>
          
          <Link
            href="/"
            className="px-6 py-2 bg-gradient-to-r from-[#4ECDC4] to-[#6C5CE7] text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Create Yours
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-12 text-center">
        <CosmicText variant="h1" gradient glow className="mb-4">
          Discover Cosmic Musical DNA
        </CosmicText>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore the universe of musical taste. See how others&apos; listening 
          habits form unique constellations across the cosmos.
        </p>
      </div>

      {/* Feed Grid */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedData?.items.map((item) => (
              <AnalysisCard key={item.id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          {feedData && feedData.pagination.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={!feedData.pagination.hasPrev}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  feedData.pagination.hasPrev
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                }`}
              >
                ← Previous
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: feedData.pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    const current = feedData.pagination.currentPage;
                    return (
                      page === 1 ||
                      page === feedData.pagination.totalPages ||
                      Math.abs(page - current) <= 1
                    );
                  })
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full font-semibold transition-all ${
                          page === feedData.pagination.currentPage
                            ? 'bg-[#4ECDC4] text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={!feedData.pagination.hasNext}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  feedData.pagination.hasNext
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                }`}
              >
                Next →
              </button>
            </div>
          )}

          {/* Stats */}
          <p className="text-center text-gray-500 mt-8 text-sm">
            Showing {feedData?.items.length} of {feedData?.pagination.totalItems} cosmic discoveries
          </p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a] to-transparent py-6 px-4 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-[#4ECDC4] to-[#6C5CE7] text-white font-bold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-[#4ECDC4]/30"
          >
            ✨ Create Your TastePrint
          </Link>
        </div>
      </div>
    </div>
  );
}

function AnalysisCard({ item }: { item: FeedItem }) {
  return (
    <Link href={`/taste/${item.id}`}>
      <div className="group bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-[#4ECDC4]/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:bg-gray-800/80">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          {item.user.images?.[0] ? (
            <img
              src={item.user.images[0].url}
              alt={item.user.displayName}
              className="w-12 h-12 rounded-full border-2 border-[#4ECDC4]/50"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#6C5CE7] flex items-center justify-center text-white font-bold">
              {item.user.displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold text-white group-hover:text-[#4ECDC4] transition-colors">
              {item.user.displayName}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Preview Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Top Genre</span>
            <span className="text-[#FFD93D] font-semibold capitalize">
              {item.preview.topGenre}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Tracks Analyzed</span>
            <span className="text-white font-semibold">
              {item.preview.trackCount}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Mood</span>
            <span className="text-[#4ECDC4] font-semibold">
              {item.preview.dominantMood}
            </span>
          </div>
        </div>

        {/* View Count */}
        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-500">
          <span>{item.viewCount} views</span>
          <span className="text-[#4ECDC4] group-hover:translate-x-1 transition-transform">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

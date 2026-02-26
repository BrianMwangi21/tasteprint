'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SceneSetup from '@/components/visualizations/SceneSetup';
import GeneticHelix from '@/components/visualizations/GeneticHelix';
import TimeTunnelScene from '@/components/visualizations/TimeTunnelScene';
import { CosmicText, GlowingText } from '@/components/ui/CosmicTypography';
import { RadarUI } from '@/components/ui/ScannerRadar';
import { AnalysisResponse } from '@/types';
import ShareButtons from '@/components/shared/ShareButtons';

export default function TastePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'helix' | 'tunnel'>('helix');

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/taste/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Analysis not found');
          }
          throw new Error('Failed to load analysis');
        }
        
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-center">
          <RadarUI active={true} className="w-64 h-64 mx-auto mb-8" />
          <p className="text-gray-400">Loading your TastePrint...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {error || 'Analysis not found'}
          </h2>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#4ECDC4] text-white rounded-full font-semibold hover:bg-[#3DBDB4] transition-colors"
          >
            Create Your Own
          </Link>
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
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {analysis.metadata.viewCount} views
            </span>
            <ShareButtons 
              url={`https://tasteprint.com/taste/${id}`}
              title={`${analysis.user.displayName}'s TastePrint`}
            />
          </div>
        </div>
      </header>

      {/* User Info */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="max-w-4xl mx-auto">
          {analysis.user.images?.[0] && (
            <img
              src={analysis.user.images[0].url}
              alt={analysis.user.displayName}
              className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#4ECDC4]"
            />
          )}
          <CosmicText variant="h1" gradient className="mb-2">
            {analysis.user.displayName}&apos;s
          </CosmicText>
          <CosmicText variant="h2" glow className="mb-6">
            Musical DNA
          </CosmicText>
          
          {/* AI Story */}
          <div className="bg-gradient-to-r from-[#4ECDC4]/10 via-[#6C5CE7]/10 to-[#FFD93D]/10 rounded-2xl p-6 mb-8 max-w-2xl mx-auto border border-[#4ECDC4]/30">
            <p className="text-lg italic text-gray-300 leading-relaxed">
              &ldquo;{analysis.analysis.aiStory}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 mb-4">
        <div className="max-w-2xl mx-auto flex gap-4">
          <button
            onClick={() => setActiveTab('helix')}
            className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${
              activeTab === 'helix'
                ? 'bg-[#4ECDC4] text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🧬 Genetic Helix
          </button>
          <button
            onClick={() => setActiveTab('tunnel')}
            className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${
              activeTab === 'tunnel'
                ? 'bg-[#6C5CE7] text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🌌 Time Tunnel
          </button>
        </div>
      </div>

      {/* 3D Visualization */}
      <div className="relative h-[60vh] min-h-[400px]">
        <SceneSetup
          cameraPosition={activeTab === 'helix' ? [0, 0, 15] : [0, 0, 20]}
          enableControls={true}
        >
          {activeTab === 'helix' ? (
            <GeneticHelix data={analysis.analysis.geneticHelix} />
          ) : (
            <TimeTunnelScene data={analysis.analysis.timeTunnel} />
          )}
        </SceneSetup>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-sm">
          {activeTab === 'helix' ? (
            <div className="space-y-2">
              <p className="text-[#4ECDC4]">● Energy Strand</p>
              <p className="text-[#6C5CE7]">● Mood Strand</p>
              <p className="text-[#FFD93D]">○ Tracks (hover for info)</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[#FFD93D]">● Morning</p>
              <p className="text-[#FF6B6B]">● Afternoon</p>
              <p className="text-[#4ECDC4]">● Evening</p>
              <p className="text-[#6C5CE7]">● Night</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <CosmicText variant="h3" gradient className="text-center mb-6">
            Your Listening Stats
          </CosmicText>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-[#4ECDC4]">
                {analysis.analysis.summary.listeningDiversity.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-400">Diversity</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-[#6C5CE7]">
                {analysis.analysis.summary.discoveryScore.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-400">Discovery</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-[#FFD93D]">
                {analysis.analysis.summary.favoriteDecade}
              </p>
              <p className="text-sm text-gray-400">Favorite Era</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-white">
                {analysis.analysis.summary.topGenres[0]}
              </p>
              <p className="text-sm text-gray-400">Top Genre</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-12 text-center border-t border-gray-800">
        <p className="text-gray-400 mb-6">Want to discover your own musical DNA?</p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-[#4ECDC4] to-[#6C5CE7] text-white font-bold rounded-full hover:opacity-90 transition-opacity"
        >
          Create Your TastePrint
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SceneSetup from '@/components/visualizations/SceneSetup';
import GeneticHelix from '@/components/visualizations/GeneticHelix';
import TimeTunnelScene from '@/components/visualizations/TimeTunnelScene';
import { AnalysisResponse } from '@/types';
import ShareButtons from '@/components/shared/ShareButtons';
import { ZineBackground, InkDistortionFilter, TapeStrip, Sticker } from '@/components/zine/ZineElements';

interface TastePageClientProps {
  id: string;
}

export default function TastePageClient({ id }: TastePageClientProps) {
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
      <div className="min-h-screen bg-[#e8e4db] flex items-center justify-center font-mono">
        <ZineBackground />
        <div className="text-center space-y-4 animate-pulse">
          <div className="font-glitch text-4xl text-[#ff3e3e]">RETRIEVING...</div>
          <div className="font-shade text-xl italic uppercase">Opening Archives</div>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-[#e8e4db] flex items-center justify-center px-4 font-mono">
        <ZineBackground />
        <div className="zine-card p-12 text-center space-y-6 max-w-md bg-white">
          <div className="text-6xl">🔍</div>
          <h2 className="font-shade text-3xl text-[#ff3e3e]">ARCHIVE LOST</h2>
          <p className="font-elite text-lg opacity-70">{error || 'Analysis not found'}</p>
          <Link
            href="/"
            className="block w-full py-4 bg-[#1a1a1a] text-white font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
          >
            CREATE NEW REPORT
          </Link>
        </div>
      </div>
    );
  }

  const { geneticHelix, timeTunnel, summary, aiStory } = analysis.analysis;

  return (
    <div className="min-h-screen bg-[#e8e4db] text-[#1a1a1a] font-mono overflow-x-hidden selection:bg-[#ff3e3e] selection:text-white relative">
      <ZineBackground />
      <InkDistortionFilter />

      {/* Main Content */}
      <main className="relative z-10 p-4 md:p-12 lg:p-24 max-w-7xl mx-auto space-y-24 md:space-y-48">
        
        {/* Masthead */}
        <header className="relative py-16 md:py-32 bg-white border-[6px] md:border-[10px] border-[#1a1a1a] flex flex-col items-center justify-center text-center overflow-hidden zine-card">
          <TapeStrip className="-top-4 -left-4 rotate-[-35deg] scale-75 md:scale-100" />
          <TapeStrip className="top-[-10px] right-[-30px] rotate-[20deg] scale-75 md:scale-100" />
          
          <div className="flex justify-between w-full px-8 absolute top-8 left-0">
             <div className="font-mono text-[8px] md:text-[10px] font-black uppercase opacity-40">VOL. 01 // NO. {analysis.metadata.viewCount}</div>
             <div className="font-mono text-[8px] md:text-[10px] font-black uppercase opacity-40">Report Date: {new Date(analysis.metadata.createdAt).toLocaleDateString()}</div>
          </div>

          <h1 className="font-shade text-[15vw] leading-[0.8] tracking-tighter mb-8 transform -rotate-1" style={{ filter: 'url(#ink-distortion)' }}>
            SONIC<br/>PROFILE
          </h1>

          <div className="relative mb-12 px-4">
            <h2 className="font-glitch text-4xl md:text-8xl text-[#ff3e3e] uppercase tracking-widest relative z-10">
              {analysis.user.displayName}
            </h2>
            <div className="absolute -inset-x-8 h-8 md:h-12 bg-black/5 -rotate-2 -z-10" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
             <div className="marker-yellow font-elite text-lg md:text-2xl px-4 py-1">VERIFIED SIGNAL</div>
             <ShareButtons 
               url={`https://tasteprint.com/taste/${id}`}
               title={`${analysis.user.displayName}'s TastePrint`}
             />
          </div>
        </header>

        {/* The 3D Anomalies - Helix and Tunnel */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <button
              onClick={() => setActiveTab('helix')}
              className={`px-8 py-4 zine-card font-shade text-xl flex-1 transition-all ${activeTab === 'helix' ? 'bg-[#ff3e3e] text-white -translate-y-1' : 'bg-white'}`}
            >
              🧬 GENETIC_DATA
            </button>
            <button
              onClick={() => setActiveTab('tunnel')}
              className={`px-8 py-4 zine-card font-shade text-xl flex-1 transition-all ${activeTab === 'tunnel' ? 'bg-[#ff3e3e] text-white -translate-y-1' : 'bg-white'}`}
            >
              🌌 TEMPORAL_LOG
            </button>
          </div>

          <div className="zine-card h-[60vh] min-h-[400px] bg-black overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
               <div className="bg-white text-black px-2 py-1 font-mono text-[10px] font-black uppercase">Figure 0{activeTab === 'helix' ? '1' : '2'}: Sonic Anomaly</div>
            </div>
            
            <SceneSetup
              cameraPosition={activeTab === 'helix' ? [0, 0, 15] : [0, 0, 20]}
              enableControls={true}
            >
              {activeTab === 'helix' ? (
                <GeneticHelix data={geneticHelix} />
              ) : (
                <TimeTunnelScene data={timeTunnel} />
              )}
            </SceneSetup>

            {/* Legend - Taped on */}
            <div className="absolute bottom-4 left-4 z-20 zine-card p-4 bg-white/90 backdrop-blur-sm text-[10px] md:text-xs">
              <TapeStrip className="-top-2 -left-2 rotate-12 scale-50" />
              {activeTab === 'helix' ? (
                <div className="space-y-1 font-mono font-bold">
                  <p className="text-[#4ECDC4]">● ENERGY_STRAND</p>
                  <p className="text-[#6C5CE7]">● MOOD_STRAND</p>
                  <p className="text-red-600">○ SIGNAL_POINTS</p>
                </div>
              ) : (
                <div className="space-y-1 font-mono font-bold">
                  <p className="text-[#FFD93D]">● MORNING_INPUT</p>
                  <p className="text-[#FF6B6B]">● AFTERNOON_INPUT</p>
                  <p className="text-[#4ECDC4]">● EVENING_INPUT</p>
                  <p className="text-[#6C5CE7]">● NIGHT_INPUT</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Data Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 relative">
          {[
            { label: 'DIVERSITY_IDX', val: `${Math.round(summary.listeningDiversity)}%`, color: 'text-[#ff3e3e]' },
            { label: 'DISCOVERY_VAL', val: `${Math.round(summary.discoveryScore)}%`, color: 'text-black' },
            { label: 'PRIMARY_ERA', val: summary.favoriteDecade, color: 'text-blue-600' },
            { label: 'BREACH_COUNT', val: analysis.metadata.viewCount, color: 'text-green-600' },
          ].map((stat, i) => (
            <div key={i} className="zine-card p-6 md:p-10 flex flex-col items-center justify-center space-y-4 md:space-y-6 transform rotate-[1deg] even:-rotate-[1deg]">
               <div className="font-mono text-[8px] md:text-[9px] font-black border-b-2 border-[#1a1a1a] w-full text-center pb-2 opacity-50 uppercase">{stat.label}</div>
               <div className={`font-shade text-3xl md:text-7xl ${stat.color}`}>{stat.val}</div>
            </div>
          ))}
        </section>

        {/* The Classifieds - Genres */}
        <section className="relative p-8 md:p-12 bg-white border-[6px] md:border-[10px] border-[#1a1a1a] zine-card">
          <div className="mb-12 md:mb-20 space-y-4">
             <h2 className="font-shade text-4xl md:text-8xl leading-none">THE NOISE<br/><span className="text-[#ff3e3e]">DIRECTORY</span></h2>
             <div className="h-2 md:h-3 w-full bg-black/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-12">
            {summary.topGenres.map((genre, i) => (
              <div key={i} className="flex gap-4 md:gap-8 group">
                <div className="font-glitch text-4xl md:text-7xl opacity-20 group-hover:opacity-100 transition-all">0{i+1}</div>
                <div className="flex-1 space-y-2">
                   <h3 className="font-marker text-2xl md:text-5xl uppercase tracking-tighter transform group-hover:-rotate-2 transition-transform">
                     {genre}
                   </h3>
                   <div className="flex gap-2">
                      <span className="w-4 h-1 bg-black" />
                      <span className="w-4 h-1 bg-black/20" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Narrative - Redacted Manifesto */}
        <section className="relative z-10 zine-card p-8 md:p-32 bg-white max-w-5xl mx-auto transform -rotate-1">
          <div className="tape-strip top-0 left-1/2 -translate-x-1/2 -mt-4 rotate-1 scale-75 md:scale-100" />
          
          <div className="mb-8 md:mb-16 flex flex-col items-center gap-4">
            <h3 className="font-mono text-[8px] md:text-xs font-black uppercase tracking-[0.5em] marker-yellow text-center">Decrypted Narrative // Subject: {analysis.user.displayName}</h3>
          </div>

          <p className="font-elite text-2xl md:text-6xl leading-[1.1] text-center font-bold first-letter:text-6xl md:first-letter:text-[120px] first-letter:float-left first-letter:mr-4 md:first-letter:mr-6 first-letter:font-shade first-letter:leading-[0.8] first-letter:mt-2 md:first-letter:mt-4">
             {aiStory.split(' ').map((word, i) => (
               <span key={i} className={`${i % 9 === 0 ? 'redacted' : ''} transition-colors`}>{word} </span>
             ))}
          </p>
        </section>

        {/* Audio Features - Lab Report */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-[6px] md:border-[10px] border-[#1a1a1a] zine-card overflow-hidden">
          <div className="lg:col-span-2 bg-[#1a1a1a] text-white p-8 md:p-20 space-y-8 relative overflow-hidden">
            <div className="halftone absolute inset-0 opacity-20" />
            <h3 className="font-shade text-6xl md:text-8xl leading-[0.8] relative z-10">SONIC<br/>BIO</h3>
            <div className="font-glitch text-3xl md:text-6xl text-red-500 border-4 border-dashed border-red-500 p-6 text-center relative z-10 uppercase">
              {geneticHelix.summary.dominantMood}
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-8 md:p-20 space-y-12">
            {[
              { name: 'AMPLITUDE (Energy)', val: geneticHelix.summary.averageEnergy, color: '#fbff00' },
              { name: 'PHASE (Valence)', val: geneticHelix.summary.averageValence, color: '#ff3e3e' },
              { name: 'MODULATION (Dance)', val: geneticHelix.summary.averageDanceability, color: '#00ff00' },
              { name: 'RESONANCE (Acoustic)', val: geneticHelix.summary.averageAcousticness, color: '#2b4cc4' },
            ].map((feat, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between font-mono text-[10px] md:text-sm font-black">
                  <span>{feat.name}</span>
                  <span className="font-glitch text-xl">[{Math.round(feat.val * 100)}%]</span>
                </div>
                <div className="h-10 md:h-12 border-4 border-[#1a1a1a] relative bg-white p-1">
                   <div 
                     className="h-full border-r-4 border-[#1a1a1a] transition-all duration-1000"
                     style={{ width: `${feat.val * 100}%`, backgroundColor: feat.color }}
                   />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="py-24 border-t-8 border-black text-center space-y-12">
          <div className="font-shade text-4xl md:text-7xl italic opacity-20">VOID TRANSMISSION</div>
          <p className="font-elite text-xl">Want to leak your own sonic data?</p>
          <Link
            href="/"
            className="inline-block px-12 py-6 bg-[#ff3e3e] text-white font-black text-2xl uppercase zine-card hover:bg-black transition-colors"
          >
            JOIN THE REVOLUTION
          </Link>
        </footer>

      </main>
    </div>
  );
}

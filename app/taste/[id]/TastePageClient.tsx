'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnalysisResponse, SpotifyArtist, SpotifyTrack, SpotifyRecentlyPlayed } from '@/types';
import ShareButtons from '@/components/shared/ShareButtons';
import { ZineBackground, InkDistortionFilter, TapeStrip, Sticker } from '@/components/zine/ZineElements';

interface TastePageClientProps {
  id: string;
}

export default function TastePageClient({ id }: TastePageClientProps) {
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const { summary, aiStory } = analysis.analysis;
  const { topTracks, topArtists, recentlyPlayed } = analysis.data;

  return (
    <div className="min-h-screen bg-[#e8e4db] text-[#1a1a1a] font-mono overflow-x-hidden selection:bg-[#ff3e3e] selection:text-white relative pb-32">
      <ZineBackground />
      <InkDistortionFilter />

      {/* Main Content */}
      <main className="relative z-10 p-4 md:p-12 lg:p-24 max-w-7xl mx-auto space-y-32 md:space-y-48">
        
        {/* Masthead */}
        <header className="relative py-16 md:py-32 bg-white border-[6px] md:border-[10px] border-[#1a1a1a] flex flex-col items-center justify-center text-center overflow-hidden zine-card">
          <TapeStrip className="-top-4 -left-4 rotate-[-35deg] scale-75 md:scale-100" />
          <TapeStrip className="top-[-10px] right-[-30px] rotate-[20deg] scale-75 md:scale-100" />
          
          <div className="flex justify-between w-full px-8 absolute top-8 left-0">
             <div className="font-mono text-[8px] md:text-[10px] font-black uppercase opacity-40">CASE_FILE // NO. {analysis.id.slice(0, 6)}</div>
             <div className="font-mono text-[8px] md:text-[10px] font-black uppercase opacity-40">Log Date: {new Date(analysis.metadata.createdAt).toLocaleDateString()}</div>
          </div>

          <h1 className="font-shade text-[15vw] leading-[0.8] tracking-tighter mb-8 transform -rotate-1" style={{ filter: 'url(#ink-distortion)' }}>
            SONIC<br/>REPORT
          </h1>

          <div className="relative mb-12 px-4">
            <h2 className="font-glitch text-4xl md:text-8xl text-[#ff3e3e] uppercase tracking-widest relative z-10">
              {analysis.user.displayName}
            </h2>
            <div className="absolute -inset-x-8 h-8 md:h-12 bg-black/5 -rotate-2 -z-10" />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
             <div className="marker-yellow font-elite text-lg md:text-2xl px-4 py-1">SUBJECT UNDER SURVEILLANCE</div>
             <ShareButtons 
               url={`https://tasteprint.com/taste/${id}`}
               title={`${analysis.user.displayName}'s Sonic Case File`}
             />
          </div>
        </header>

        {/* Data Grid - Intel Summary */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 relative">
          {[
            { label: 'AURA_VARIANCE', val: `${Math.round(summary.listeningDiversity)}%`, color: 'text-[#ff3e3e]' },
            { label: 'BREACH_DEPTH', val: `${Math.round(summary.discoveryScore)}%`, color: 'text-black' },
            { label: 'ERA_ORIGIN', val: summary.favoriteDecade, color: 'text-blue-600' },
            { label: 'EYE_WITNESSES', val: analysis.metadata.viewCount, color: 'text-green-600' },
          ].map((stat, i) => (
            <div key={i} className="zine-card p-6 md:p-10 flex flex-col items-center justify-center space-y-4 md:space-y-6 transform rotate-[1deg] even:-rotate-[1deg] bg-white group hover:rotate-0 transition-transform">
               <div className="font-mono text-[8px] md:text-[9px] font-black border-b-2 border-[#1a1a1a] w-full text-center pb-2 opacity-50 uppercase">{stat.label}</div>
               <div className={`font-shade text-3xl md:text-7xl ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</div>
            </div>
          ))}
        </section>

        {/* Suspect Lineup - Top Artists */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="font-shade text-5xl md:text-8xl tracking-tighter uppercase">Suspect Lineup</h2>
            <div className="h-4 flex-1 bg-black" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {topArtists.mediumTerm.slice(0, 10).map((artist, i) => (
              <div key={artist.id} className="zine-card p-0 bg-white overflow-hidden group">
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img 
                    src={artist.images[0]?.url} 
                    alt={artist.name}
                    className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                  />
                  {/* Censorship Bar */}
                  <div className="absolute top-1/3 left-0 w-full h-8 bg-black z-20 group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <div className="absolute top-4 left-4 z-30">
                    <span className="bg-red-600 text-white font-mono text-[8px] font-black px-2 py-1">LVL: {artist.popularity}</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-marker text-xl truncate uppercase">{artist.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    {artist.genres.slice(0, 2).map(g => (
                      <span key={g} className="font-mono text-[8px] bg-black text-white px-1 uppercase">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Narrative - Redacted Manifesto */}
        <section className="relative z-10 zine-card p-8 md:p-32 bg-white max-w-5xl mx-auto transform -rotate-1 ink-smear">
          <div className="tape-strip top-0 left-1/2 -translate-x-1/2 -mt-4 rotate-1 scale-75 md:scale-100" />
          
          <div className="mb-12 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-black flex items-center justify-center font-bold text-xl">!</div>
            <h3 className="font-mono text-[8px] md:text-xs font-black uppercase tracking-[0.5em] marker-yellow text-center">Interpreted Narrative // Intel ID: {id.slice(0,4)}</h3>
          </div>

          <p className="font-elite text-2xl md:text-6xl leading-[1.1] text-center font-bold">
             {aiStory.split(' ').map((word, i) => (
               <span key={i} className={`${i % 11 === 0 ? 'redacted' : ''} transition-colors`}>{word} </span>
             ))}
          </p>
          
          <div className="mt-16 text-center">
            <span className="font-salt text-red-600 text-sm md:text-xl">DECRYPTED AT 4:00 AM</span>
          </div>
        </section>

        {/* The Noise Directory - Genre Breakdown */}
        <section className="relative p-8 md:p-12 bg-white border-[6px] md:border-[10px] border-[#1a1a1a] zine-card">
          <div className="absolute top-2 right-4 font-mono text-[8px] font-black uppercase bg-red-600 text-white px-2">Ref: NOISE_LOG</div>
          <div className="mb-12 md:mb-20 space-y-4">
             <h2 className="font-shade text-4xl md:text-8xl leading-none">NOISE<br/><span className="text-[#ff3e3e]">DIRECTORY</span></h2>
             <div className="h-2 md:h-3 w-full bg-black/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {summary.topGenres.map((genre, i) => (
              <div key={i} className="flex gap-4 group cursor-none">
                <div className="font-glitch text-4xl md:text-6xl opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all">0{i+1}</div>
                <div className="flex-1 border-b-2 border-dashed border-black/20 pb-4">
                   <h3 className="font-marker text-2xl md:text-4xl uppercase tracking-tighter transform group-hover:-rotate-2 transition-transform">
                     {genre}
                   </h3>
                   <div className="mt-2 flex gap-1">
                      <div className="w-full h-1 bg-black group-hover:bg-red-600" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Criminal Record - Top Tracks */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="font-shade text-5xl md:text-8xl tracking-tighter uppercase">Criminal Record</h2>
            <div className="h-4 flex-1 bg-black" />
          </div>

          <div className="divide-y-4 divide-[#1a1a1a] zine-card p-0 bg-white overflow-hidden">
            {topTracks.shortTerm.map((track, i) => (
              <div key={track.id} className="p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 hover:bg-[#1a1a1a] hover:text-white transition-all group">
                <div className="font-shade text-6xl md:text-8xl opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all shrink-0">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                
                <div className="flex-1 space-y-4 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
                    <h4 className="font-marker text-3xl md:text-6xl uppercase tracking-tighter group-hover:italic group-hover:translate-x-4 transition-all duration-300 truncate">
                      {track.name}
                    </h4>
                    <span className="bg-red-600 text-white px-2 py-0.5 font-mono text-[8px] font-black hidden lg:block opacity-0 group-hover:opacity-100 uppercase">Evidence_Captured</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-elite text-2xl opacity-60 group-hover:opacity-100">{track.artists[0].name}</span>
                    <span className="w-2 h-2 rounded-full bg-black group-hover:bg-red-600" />
                    <span className="font-mono text-[8px] md:text-[10px] tracking-widest uppercase opacity-40 group-hover:opacity-80 italic truncate">{track.album.name}</span>
                  </div>
                </div>

                <div className="hidden xl:flex flex-col text-right font-mono text-[10px] space-y-1 opacity-20 group-hover:opacity-100">
                   <div>POPL: {track.popularity}%</div>
                   <div>TIME: {Math.floor(track.duration_ms / 1000)} SEC</div>
                   <div>RELEASE: {track.album.release_date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Surveillance Log - Recently Played */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <h2 className="font-shade text-5xl md:text-8xl tracking-tighter uppercase text-[#ff3e3e]">Surveillance Log</h2>
            <div className="h-4 flex-1 bg-red-600" />
          </div>

          <div className="zine-card p-0 bg-white border-red-600 shadow-[12px_12px_0px_#ff3e3e]">
            <div className="bg-red-600 text-white p-4 font-mono font-black text-xs uppercase tracking-widest flex justify-between">
              <span>Dot Matrix Transmission // Live Feed</span>
              <span>Scanning...</span>
            </div>
            <div className="divide-y-2 divide-red-600/10 font-mono">
              {recentlyPlayed.slice(0, 15).map((item, i) => (
                <div key={`${item.track.id}-${item.played_at}`} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 hover:bg-red-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-red-600 font-bold">[{new Date(item.played_at).toLocaleTimeString()}]</span>
                    <span className="font-black uppercase truncate max-w-[200px] md:max-w-md">{item.track.name}</span>
                  </div>
                  <div className="flex items-center gap-4 opacity-40">
                    <span className="text-[10px] uppercase">{item.track.artists[0].name}</span>
                    <span className="text-[10px]">-- RECORDED</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-red-600 h-8 flex items-center justify-center">
               <div className="w-full h-px bg-white/20 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="py-24 border-t-8 border-black text-center space-y-12">
          <div className="font-shade text-4xl md:text-9xl italic opacity-20">VOID TRANSMISSION END</div>
          <div className="max-w-xl mx-auto space-y-8">
            <p className="font-elite text-xl">THE EVIDENCE IS CLEAR. YOUR TASTE IS COMPROMISED.</p>
            <Link
              href="/"
              className="inline-block px-12 py-6 bg-[#ff3e3e] text-white font-black text-2xl uppercase zine-card hover:bg-black transition-all hover:scale-105"
            >
              BREACH YOUR OWN SIGNAL
            </Link>
          </div>
          <div className="flex justify-center gap-6 py-12">
            <div className="w-12 h-12 bg-black rotate-12" />
            <div className="w-12 h-12 bg-red-600 -rotate-6" />
            <div className="w-12 h-12 border-4 border-black rotate-3" />
          </div>
        </footer>

      </main>
    </div>
  );
}

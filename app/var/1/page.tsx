'use client';

import React, { useEffect, useState, useRef } from 'react';
import { dummyAnalysisData } from '@/lib/dummy-data';
import { AnalysisDocument } from '@/types/index';

export default function AnalogPulseZinePage() {
  const data: AnalysisDocument = dummyAnalysisData;
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#e8e4db]" />;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#e8e4db] text-[#1a1a1a] font-mono overflow-x-hidden selection:bg-[#ff3e3e] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bungee+Shade&family=Rubik+Glitch&family=Special+Elite&family=Permanent+Marker&family=Rock+Salt&display=swap');
        
        :root {
          --highlighter-y: #fbff00;
          --highlighter-p: #ff00ff;
          --highlighter-g: #00ff00;
          --paper-base: #e8e4db;
        }

        .font-mono { font-family: 'Space Mono', monospace; }
        .font-shade { font-family: 'Bungee Shade', cursive; }
        .font-glitch { font-family: 'Rubik Glitch', display; }
        .font-elite { font-family: 'Special Elite', cursive; }
        .font-marker { font-family: 'Permanent Marker', cursive; }
        .font-salt { font-family: 'Rock Salt', cursive; }

        .xerox-grain {
          background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
          opacity: 0.15;
          pointer-events: none;
        }

        .halftone {
          background-image: radial-gradient(rgba(0,0,0,0.8) 15%, transparent 15%);
          background-size: 6px 6px;
          opacity: 0.08;
          pointer-events: none;
        }

        .paper-texture {
          background-image: url('https://www.transparenttextures.com/patterns/p6-dark.png');
          opacity: 0.03;
          pointer-events: none;
        }

        @keyframes subtle-drift {
          0%, 100% { transform: translate(0, 0) rotate(0.5deg); }
          50% { transform: translate(2px, -2px) rotate(-0.5deg); }
        }

        .zine-card {
          border: 3px solid #1a1a1a;
          box-shadow: 12px 12px 0px #1a1a1a;
          background: white;
          position: relative;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
        }

        .zine-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 16px 16px 0px #1a1a1a;
        }

        .sticker {
          position: absolute;
          padding: 8px 12px;
          font-family: 'Space Mono', monospace;
          font-weight: 900;
          font-size: 10px;
          text-transform: uppercase;
          z-index: 20;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .sticker:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .marker-yellow { background: var(--highlighter-y); padding: 0 8px; transform: rotate(-1deg); display: inline-block; }
        .marker-pink { background: var(--highlighter-p); padding: 0 8px; color: white; transform: rotate(1.5deg); display: inline-block; }
        .marker-green { background: var(--highlighter-g); padding: 0 8px; transform: rotate(-0.5deg); display: inline-block; }

        .redacted {
          background: #1a1a1a;
          color: transparent;
          transition: color 0.2s;
          cursor: help;
          padding: 0 4px;
        }

        .redacted:hover {
          color: white;
        }

        .tape-strip {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(1px);
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
          width: 100px;
          height: 35px;
          position: absolute;
          z-index: 30;
          opacity: 0.7;
        }

        .ink-smear {
          filter: url('#ink-distortion');
        }

        .coffee-stain {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #8b4513 0%, transparent 70%);
          opacity: 0.05;
          border-radius: 50%;
          pointer-events: none;
        }

        .grid-bg {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
        }

        .handwritten {
          font-family: 'Rock Salt', cursive;
          font-size: 12px;
          color: #2b4cc4;
          opacity: 0.8;
        }
      `}</style>

      {/* SVG Filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="ink-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
      </svg>

      {/* Global Background Textures */}
      <div className="fixed inset-0 z-0 grid-bg" />
      <div className="fixed inset-0 z-50 xerox-grain" />
      <div className="fixed inset-0 z-50 halftone" />
      <div className="fixed inset-0 z-50 paper-texture" />

      {/* Decorative Random Elements */}
      <div className="fixed top-20 left-[10%] coffee-stain rotate-12" />
      <div className="fixed bottom-40 right-[5%] coffee-stain -rotate-45 scale-150" />

      <main className="relative z-10 p-4 md:p-12 lg:p-24 max-w-7xl mx-auto space-y-24 md:space-y-48">
        
        {/* MASTHEAD - THE OVERACHIEVER VERSION */}
        <header className="relative py-16 md:py-32 bg-white border-[6px] md:border-[10px] border-[#1a1a1a] flex flex-col items-center justify-center text-center overflow-hidden zine-card animate-[subtle-drift_6s_ease-in-out_infinite]">
          {/* Tape elements */}
          <div className="tape-strip -top-4 -left-4 rotate-[-35deg] scale-75 md:scale-100" />
          <div className="tape-strip top-[-10px] right-[-30px] rotate-[20deg] scale-75 md:scale-100" />
          
          {/* Floating Stickers - Responsive positioning */}
          <div className="sticker top-4 right-4 md:top-10 md:right-10 bg-[#1a1a1a] text-white -rotate-6 scale-75 md:scale-100">LOUD AS HELL</div>
          <div className="sticker bottom-4 left-4 md:bottom-10 md:left-10 border-2 border-[#1a1a1a] rotate-12 scale-75 md:scale-100">DO NOT COPY</div>

          <div className="space-y-4 mb-8 md:mb-12">
            <div className="font-mono text-[10px] font-black tracking-[0.4em] md:tracking-[0.8em] uppercase opacity-40">Artifact ID: {data.publicId}</div>
            <div className="h-1 md:h-2 w-32 md:w-48 bg-[#1a1a1a] mx-auto" />
          </div>

          <h1 className="font-shade text-[18vw] md:text-[15vw] leading-[0.8] tracking-tighter mb-6 md:mb-8 transform -rotate-1 ink-smear">
            SONIC<br/>REBEL
          </h1>

          <div className="relative mb-8 md:mb-12 px-4">
            <span className="handwritten absolute -top-10 left-1/2 -translate-x-1/2 md:-top-8 md:-left-12 rotate-[-15deg] scale-110 md:scale-150 whitespace-nowrap">Look at this!</span>
            <h2 className="font-glitch text-3xl md:text-8xl text-[#ff3e3e] uppercase tracking-widest relative z-10 break-words">
              {data.user.displayName}
            </h2>
            <div className="absolute -inset-x-8 h-8 md:h-12 bg-black/5 -rotate-2 -z-10" />
          </div>

          <p className="font-elite text-xl md:text-3xl max-w-2xl leading-relaxed transform rotate-1 px-4 md:px-8">
            This is the raw, unedited transcription of your <span className="marker-yellow">auditory fingerprints</span>. A manifesto of the noise you call <span className="marker-pink">taste</span>.
          </p>

          {/* Random hand-drawn arrow placeholder using SVG path */}
          <div className="absolute bottom-10 right-20 hidden lg:block">
            <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="opacity-40">
              <path d="M10,10 Q50,50 90,10" stroke="black" strokeWidth="2" strokeLinecap="round" />
              <path d="M80,5 L95,10 L85,20" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="handwritten block mt-2 text-black">Keep going...</span>
          </div>
        </header>

        {/* DATA VANDALISM - THE STATS SECTION */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 relative">
          <div className="handwritten absolute -top-16 right-4 md:right-20 z-20 text-red-600 rotate-12 text-sm md:text-lg">These numbers don&apos;t lie!</div>
          {[
            { label: 'RECORD_COUNT', val: data.data.savedTracksCount, highlight: 'marker-yellow', deg: 'rotate-2' },
            { label: 'CHAOS_INDEX', val: `${Math.round(data.analysis.summary.listeningDiversity * 100)}%`, highlight: 'marker-pink', deg: '-rotate-3' },
            { label: 'RARITY_GRAD', val: `${Math.round(data.analysis.summary.discoveryScore * 100)}%`, highlight: 'marker-green', deg: 'rotate-1' },
            { label: 'INTEL_VIEWS', val: data.metadata.viewCount, highlight: 'bg-black text-white', deg: '-rotate-1' },
          ].map((stat, i) => (
            <div key={i} className={`zine-card p-4 md:p-10 flex flex-col items-center justify-center space-y-4 md:space-y-6 transform ${stat.deg} group hover:rotate-0 transition-transform duration-300`}>
               <div className="font-mono text-[8px] md:text-[9px] font-black border-b-2 border-[#1a1a1a] w-full text-center pb-2 opacity-50 uppercase">{stat.label}</div>
               <div className="font-shade text-3xl md:text-7xl group-hover:scale-110 transition-transform">{stat.val}</div>
               <div className={`${stat.highlight} font-mono text-[8px] md:text-[10px] font-bold uppercase text-center`}>Verified Artifact</div>
            </div>
          ))}
        </section>

        {/* THE CLASSIFIEDS - TOP GENRES */}
        <section className="relative p-6 md:p-12 bg-white border-[6px] md:border-[10px] border-[#1a1a1a] zine-card">
          <div className="absolute top-2 right-4 md:top-4 md:right-8 font-mono text-[8px] md:text-[10px] font-bold uppercase bg-red-600 text-white px-2 tracking-widest">Section: CLASSIFIEDS</div>
          
          <div className="mb-12 md:mb-20 space-y-4">
             <h2 className="font-shade text-4xl md:text-8xl leading-none">THE NOISE<br/><span className="text-[#ff3e3e]">DIRECTORY</span></h2>
             <div className="h-2 md:h-3 w-full bg-black/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-12 md:gap-y-16">
            {data.analysis.summary.topGenres.map((genre, i) => (
              <div key={i} className="flex gap-4 md:gap-8 group">
                <div className="font-glitch text-4xl md:text-7xl opacity-20 group-hover:opacity-100 group-hover:text-red-600 transition-all">0{i+1}</div>
                <div className="flex-1 space-y-2">
                   <h3 className="font-marker text-2xl md:text-5xl uppercase tracking-tighter transform group-hover:-rotate-2 transition-transform">
                     {genre}
                   </h3>
                   <p className="font-mono text-[10px] md:text-xs leading-relaxed opacity-60">
                     HEAVY CONCENTRATION DETECTED. SUBJECT SHOWS REPETITIVE EXPOSURE TO THIS SPECIFIC FREQUENCY BAND. RECOMMEND FURTHER SURVEILLANCE.
                   </p>
                   <div className="flex gap-2">
                      <span className="w-4 h-1 bg-black" />
                      <span className="w-4 h-1 bg-black/20" />
                      <span className="w-4 h-1 bg-black/20" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE CRUCIBLE - AUDIO FEATURES */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-0 border-[6px] md:border-[10px] border-[#1a1a1a] zine-card overflow-hidden">
          {/* Left Column - High Contrast */}
          <div className="lg:col-span-2 bg-[#1a1a1a] text-white p-8 md:p-20 space-y-8 md:space-y-12 relative overflow-hidden">
            <div className="halftone absolute inset-0 opacity-20" />
            <div className="relative z-10 space-y-8 md:space-y-12">
               <div className="sticker bg-white text-black -left-4 top-4 md:top-10 rotate-[-12deg] scale-75 md:scale-100">LAB_REPORT_09</div>
               <h3 className="font-shade text-6xl md:text-8xl leading-[0.8]">SONIC<br/>BIO</h3>
               <p className="font-elite text-xl md:text-2xl opacity-70 leading-relaxed italic">
                 We broke down the waveform. We found the ghost in the machine. Your dominant resonance is identified as:
               </p>
               <div className="font-glitch text-3xl md:text-7xl text-red-500 border-4 border-dashed border-red-500 p-6 md:p-8 text-center ink-smear">
                 {data.analysis.geneticHelix.summary.dominantMood.toUpperCase()}
               </div>
            </div>
          </div>

          {/* Right Column - Technical Charts */}
          <div className="lg:col-span-3 bg-white p-8 md:p-20 space-y-12 md:space-y-16">
            <div className="flex justify-between items-end border-b-4 border-black pb-4 md:pb-8">
               <div className="font-mono text-[8px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em]">Technical Specifications</div>
               <div className="handwritten text-red-600 text-sm md:text-lg whitespace-nowrap">Don&apos;t touch!</div>
            </div>

            <div className="space-y-10 md:space-y-16">
              {[
                { name: 'AMPLITUDE (Energy)', val: data.analysis.geneticHelix.summary.averageEnergy, color: '#fbff00' },
                { name: 'PHASE (Valence)', val: data.analysis.geneticHelix.summary.averageValence, color: '#ff3e3e' },
                { name: 'MODULATION (Dance)', val: data.analysis.geneticHelix.summary.averageDanceability, color: '#00ff00' },
                { name: 'RESONANCE (Acoustic)', val: data.analysis.geneticHelix.summary.averageAcousticness, color: '#2b4cc4' },
              ].map((feat, i) => (
                <div key={i} className="space-y-3 md:space-y-4 group">
                  <div className="flex justify-between font-mono text-[10px] md:text-sm font-black">
                    <span className="flex items-center gap-2 md:gap-4 truncate mr-2">
                       <div className="w-2 h-2 md:w-3 md:h-3 border md:border-2 border-black shrink-0" style={{ backgroundColor: feat.color }} />
                       <span className="truncate">{feat.name}</span>
                    </span>
                    <span className="font-glitch text-lg md:text-2xl shrink-0">[{Math.round(feat.val * 100)}%]</span>
                  </div>
                  <div className="relative h-10 md:h-14 border-[3px] md:border-4 border-[#1a1a1a] relative bg-white p-1">
                     <div 
                       className="h-full border-r-[3px] md:border-r-4 border-[#1a1a1a] transition-all duration-1000 flex items-center justify-end pr-2 md:pr-4 overflow-hidden"
                       style={{ width: `${feat.val * 100}%`, backgroundColor: feat.color }}
                     >
                        <div className="font-mono text-[6px] md:text-[8px] font-black uppercase whitespace-nowrap opacity-20">MAX_INTENSITY_REACHED</div>
                     </div>
                     {/* Random Xerox Artifacts on the bar */}
                     <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply xerox-grain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE MANIFESTO - AI NARRATIVE */}
        <section className="relative py-24 md:py-48 px-4 md:px-24 overflow-hidden">
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 select-none pointer-events-none">
            <div className="font-shade text-[30vw] md:text-[20vw] rotate-12">MANIFESTO</div>
          </div>
          
          <div className="relative z-10 zine-card p-8 md:p-32 bg-white max-w-5xl mx-auto transform -rotate-1 ink-smear">
            <div className="tape-strip top-0 left-1/2 -translate-x-1/2 -mt-4 rotate-1 scale-75 md:scale-100" />
            
            <div className="mb-8 md:mb-16 flex flex-col items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] md:border-4 border-[#1a1a1a] flex items-center justify-center font-bold text-xl md:text-3xl">!</div>
              <h3 className="font-mono text-[8px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] marker-yellow text-center">Decrypted Narrative // Intel #442</h3>
            </div>

            <p className="font-elite text-2xl md:text-6xl leading-[1.1] text-center font-bold first-letter:text-6xl md:first-letter:text-[120px] first-letter:float-left first-letter:mr-4 md:first-letter:mr-6 first-letter:font-shade first-letter:leading-[0.8] first-letter:mt-2 md:first-letter:mt-4">
               {data.analysis.aiStory.split(' ').map((word, i) => (
                 <span key={i} className={`${i % 11 === 0 ? 'redacted' : ''} transition-colors`}>{word} </span>
               ))}
            </p>

            <div className="mt-12 md:mt-20 flex flex-col items-center gap-4">
              <div className="h-px w-32 md:w-48 bg-black/10" />
              <div className="handwritten text-sm md:text-xl text-red-600">Scanned at 4:00 AM</div>
            </div>
          </div>
        </section>

        {/* THE HIT-LIST - TOP TRACKS */}
        <section className="zine-card p-0 overflow-hidden bg-white">
          <div className="bg-[#1a1a1a] text-white p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
             <div className="space-y-2 text-center md:text-left">
               <h3 className="font-shade text-4xl md:text-7xl">HIT-LIST</h3>
               <div className="font-mono text-[8px] md:text-xs tracking-[0.2em] md:tracking-widest opacity-40 uppercase font-black">Subject&apos;s most frequent audio obsessions</div>
             </div>
             <div className="vandal-box-mini border-[3px] md:border-4 border-white p-2 md:p-4 font-glitch text-lg md:text-2xl text-[#ff3e3e]">CONFIDENTIAL</div>
          </div>

          <div className="divide-y-4 divide-[#1a1a1a]">
            {data.data.topTracks.shortTerm.map((track, i) => (
              <div key={i} className="p-6 md:p-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-16 hover:bg-[#1a1a1a] hover:text-white transition-all group cursor-crosshair">
                <div className="font-shade text-4xl md:text-8xl opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all shrink-0">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                
                <div className="flex-1 space-y-2 md:space-y-4 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 min-w-0">
                    <h4 className="font-marker text-2xl md:text-6xl uppercase tracking-tighter group-hover:italic group-hover:translate-x-4 transition-all duration-300 ink-smear truncate">
                      {track.name}
                    </h4>
                    <div className="bg-red-600 text-white px-2 py-0.5 font-mono text-[8px] font-black hidden lg:block opacity-0 group-hover:opacity-100 shrink-0">BREACHED</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 min-w-0">
                    <span className="font-elite text-lg md:text-2xl opacity-60 group-hover:opacity-100 truncate">{track.artists[0].name}</span>
                    <span className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-black group-hover:bg-red-600 shrink-0" />
                    <span className="font-mono text-[8px] md:text-[10px] tracking-widest uppercase opacity-40 group-hover:opacity-80 italic truncate">{track.album.name}</span>
                  </div>
                </div>

                <div className="hidden xl:block font-mono text-[10px] text-right space-y-1 opacity-20 group-hover:opacity-100 shrink-0">
                   <div>FREQ: {120 + i}HZ</div>
                   <div>DUR: {Math.floor(track.duration_ms / 1000)}SEC</div>
                   <div>STATUS: CAPTURED</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE HOROSCOPE - ZINE FLUFF */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          <div className="md:col-span-2 zine-card p-8 md:p-12 space-y-6 md:space-y-8 bg-[#fbff00] transform rotate-1">
             <h3 className="font-shade text-3xl md:text-5xl">SONIC HOROSCOPE</h3>
             <p className="font-elite text-xl md:text-2xl leading-relaxed font-bold">
               YOUR FAVORITE DECADE IS THE <span className="marker-pink text-white">{data.analysis.summary.favoriteDecade}</span>. 
               THE PLANETS ALIGN IN A FREQUENCY OF DISORTION. AVOID ACOUSTIC GUITARS THIS TUESDAY. YOUR LUCKY BPM IS 124.
             </p>
          </div>
          <div className="zine-card p-6 md:p-8 flex flex-col items-center justify-center space-y-4 bg-white transform -rotate-2">
             <div className="font-marker text-2xl md:text-3xl">AD SPACE</div>
             <div className="h-px w-full bg-black/10" />
             <p className="font-mono text-[8px] md:text-[9px] text-center opacity-40">SELL YOUR SOUL FOR A BETTER PLAYLIST. CALL 1-800-NOISE.</p>
          </div>
        </section>

        {/* FOOTER - THE FINAL PAGE */}
        <footer className="py-16 md:py-32 border-t-[6px] md:border-t-[10px] border-[#1a1a1a] text-center space-y-8 md:space-y-12">
          <div className="font-shade text-4xl md:text-9xl italic ink-smear">VOID TRANSMISSION</div>
          
          <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 px-4">
            <div className="font-mono text-[8px] md:text-xs tracking-[0.2em] md:tracking-[0.5em] opacity-40 uppercase font-black leading-relaxed">
              PRODUCED IN THE BASEMENT OF TASTEPRINT UNDERGROUND // DIY OR DIE // NO COPYRIGHT // SHARING IS A REVOLUTION // 2024
            </div>
            
            <div className="flex justify-center gap-4 md:gap-6 items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#1a1a1a] rotate-12" />
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#ff3e3e] -rotate-6" />
              <div className="w-12 h-12 md:w-16 md:h-16 border-[3px] md:border-4 border-[#1a1a1a] rotate-3" />
            </div>
          </div>

          <div className="handwritten text-lg md:text-2xl text-red-600 mt-8 md:mt-12 animate-pulse">End of the line. Go home.</div>
        </footer>

      </main>

      {/* Floating Cursor Effect - Hidden on mobile */}
      <div 
        className="fixed w-8 h-8 border-2 border-[#ff3e3e] rounded-full pointer-events-none z-[200] mix-blend-difference transition-transform duration-75 hidden md:block"
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}
      />
    </div>
  );
}

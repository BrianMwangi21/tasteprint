import Link from "next/link";
import { SpotifyConnectButton } from "@/components/shared/SpotifyConnect";
import { ZineBackground, InkDistortionFilter, TapeStrip, Sticker } from "@/components/zine/ZineElements";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e8e4db] text-[#1a1a1a] font-mono overflow-x-hidden selection:bg-[#ff3e3e] selection:text-white relative">
      <ZineBackground />
      <InkDistortionFilter />

      {/* Main Cover Content */}
      <main className="relative z-10 p-4 md:p-12 lg:p-24 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen text-center space-y-12">
        
        {/* Massive Zine Cover Heading */}
        <header className="relative py-16 md:py-32 bg-white border-[6px] md:border-[10px] border-[#1a1a1a] flex flex-col items-center justify-center w-full zine-card">
          <TapeStrip className="-top-4 -left-4 rotate-[-35deg] scale-75 md:scale-100" />
          <TapeStrip className="top-[-10px] right-[-30px] rotate-[20deg] scale-75 md:scale-100" />
          
          <div className="space-y-4 mb-8">
            <div className="font-mono text-[10px] font-black tracking-[0.8em] uppercase opacity-40">Issue #001 // DIY SONIC REPORT</div>
            <div className="h-1 md:h-2 w-32 md:w-48 bg-[#1a1a1a] mx-auto" />
          </div>

          <h1 className="font-shade text-[15vw] leading-[0.8] tracking-tighter mb-8 transform -rotate-1" style={{ filter: 'url(#ink-distortion)' }}>
            TASTE<br/>PRINT
          </h1>

          <div className="relative mb-12">
            <h2 className="font-glitch text-3xl md:text-6xl text-[#ff3e3e] uppercase tracking-widest relative z-10">
              Your Sonic Manifesto
            </h2>
            <div className="absolute -inset-x-8 h-8 md:h-12 bg-black/5 -rotate-2 -z-10" />
          </div>

          <p className="font-elite text-xl md:text-3xl max-w-2xl leading-relaxed transform rotate-1 px-4 md:px-8 mb-12">
            Transform your Spotify listening history into a visceral, DIY zine of your <span className="marker-yellow">musical DNA</span>.
          </p>

          {/* Connect CTA */}
          <div className="relative">
            <div className="absolute -top-12 -right-16 hidden md:block">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="rotate-[-15deg]">
                <path d="M10,50 Q20,10 90,10" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M80,0 L95,10 L85,20" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-salt text-xs block mt-2 text-blue-600">Start here!</span>
            </div>
            <SpotifyConnectButton className="transform hover:scale-105 transition-transform duration-300" />
          </div>
        </header>

        {/* Instructions / How It Works - Cut & Paste Style */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { step: "01", text: "SYNC YOUR SIGNAL", desc: "Connect your Spotify frequency.", rotate: "rotate-1" },
            { step: "02", text: "ANALYZE THE NOISE", desc: "We extract your sonic fingerprints.", rotate: "-rotate-2" },
            { step: "03", text: "PRINT THE TRUTH", desc: "Get your personalized zine.", rotate: "rotate-1" },
          ].map((item, i) => (
            <div key={i} className={`zine-card p-8 flex flex-col items-center justify-center space-y-4 ${item.rotate} bg-white`}>
               <div className="font-shade text-4xl text-[#ff3e3e]">{item.step}</div>
               <div className="font-mono text-sm font-black border-b-2 border-black w-full text-center pb-2 uppercase">{item.text}</div>
               <p className="font-elite text-lg opacity-70">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Footer Text */}
        <footer className="w-full pt-24 pb-12 border-t-4 border-black text-center space-y-4">
          <div className="font-shade text-2xl">VOID TRANSMISSION // 2024</div>
          <div className="font-mono text-[10px] tracking-[0.5em] opacity-40 uppercase font-black">
            NO COPYRIGHT // SHARING IS A REVOLUTION
          </div>
          <div className="flex justify-center gap-4 py-8">
            <div className="w-8 h-8 bg-[#1a1a1a] rotate-12" />
            <div className="w-8 h-8 bg-[#ff3e3e] -rotate-6" />
            <div className="w-8 h-8 border-2 border-[#1a1a1a] rotate-3" />
          </div>
        </footer>
      </main>
    </div>
  );
}

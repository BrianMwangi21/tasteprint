import Link from 'next/link';
import { ZineBackground, InkDistortionFilter, TapeStrip, Sticker } from '@/components/zine/ZineElements';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#e8e4db] flex flex-col items-center justify-center px-4 relative overflow-hidden font-mono text-[#1a1a1a]">
      <ZineBackground />
      <InkDistortionFilter />

      {/* Main Card */}
      <div className="relative z-10 text-center space-y-12 max-w-2xl w-full">
        <div className="zine-card p-12 md:p-20 bg-white transform rotate-1 relative overflow-hidden">
          {/* Tape elements */}
          <TapeStrip className="-top-4 left-1/2 -translate-x-1/2 rotate-2 opacity-60" />
          
          <div className="space-y-8 relative z-10">
            <div className="font-glitch text-6xl md:text-9xl text-[#ff3e3e] leading-none mb-4">
              404
            </div>
            
            <div className="h-2 w-full bg-black/5 relative overflow-hidden mb-8">
              <div className="absolute top-0 left-0 h-full bg-black w-full opacity-20" />
            </div>

            <h2 className="font-shade text-3xl md:text-5xl tracking-tighter uppercase mb-6" style={{ filter: 'url(#ink-distortion)' }}>
              ARCHIVE_MISSING
            </h2>

            <p className="font-elite text-xl md:text-2xl leading-relaxed italic opacity-80 mb-12">
              The record you are looking for has been <span className="redacted">redacted</span>, moved, or never existed in this timeline. The transmission was interrupted.
            </p>

            <div className="space-y-6">
              <Link
                href="/"
                className="block w-full py-6 bg-[#ff3e3e] text-white font-black text-2xl uppercase zine-card hover:bg-black transition-all hover:scale-[1.02]"
              >
                ! RETURN TO BASE
              </Link>
              
              <Link
                href="/feed"
                className="block w-full py-4 border-4 border-black text-black font-black text-sm uppercase hover:bg-[#fbff00] transition-colors"
              >
                VIEW PUBLIC RECORDS
              </Link>
            </div>
          </div>

          {/* Random stickers */}
          <Sticker className="bottom-4 right-4 bg-black text-white -rotate-6">LOST SIGNAL</Sticker>
          <Sticker className="top-10 left-4 border-2 border-black rotate-12">EVIDENCE_NULL</Sticker>
        </div>

        <p className="font-mono text-[10px] opacity-40 uppercase tracking-[0.5em] animate-pulse">
          Connection Terminated // Reference Error: PAGE_NOT_FOUND
        </p>
      </div>

      {/* Decorative Coffee Stain */}
      <div className="fixed top-[10%] right-[15%] w-64 h-64 bg-[#8b4513] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

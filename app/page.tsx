import Image from "next/image";
import Link from "next/link";
import { SpotifyConnectButton } from "@/components/shared/SpotifyConnect";
import { CosmicText, GlowingText } from "@/components/ui/CosmicTypography";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] opacity-50" />
        
        {/* Stars background effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
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

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight">
              <GlowingText color="#4ECDC4" className="inline">
                Taste
              </GlowingText>
              <span className="text-white">Print</span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            Discover Your Musical DNA Through the Cosmos
          </p>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-xl mx-auto">
            Transform your Spotify listening history into stunning 3D visualizations. 
            Explore your unique Genetic Audio Helix and journey through your Time Dilation Tunnel.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <SpotifyConnectButton className="transform hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#4ECDC4]">3D</div>
              <div className="text-sm text-gray-400">Visualizations</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#6C5CE7]">∞</div>
              <div className="text-sm text-gray-400">Shareable</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#FFD93D]">AI</div>
              <div className="text-sm text-gray-400">Generated Story</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Visualizations Preview Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <CosmicText variant="h2" gradient glow className="text-center mb-16">
            Two Cosmic Perspectives
          </CosmicText>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Genetic Helix Preview */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-[#4ECDC4]/20 to-[#6C5CE7]/20 rounded-2xl p-8 border border-[#4ECDC4]/30 hover:border-[#4ECDC4]/60 transition-all duration-300">
                <div className="aspect-square bg-[#0a0a1a] rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for 3D Helix preview */}
                  <div className="text-center">
                    <div className="text-6xl mb-4">🧬</div>
                    <p className="text-gray-400">3D Double Helix Visualization</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#4ECDC4] mb-3">
                  Genetic Audio Helix
                </h3>
                <p className="text-gray-300">
                  Your music taste visualized as a rotating DNA double helix. Each track 
                  becomes a glowing orb positioned by its energy, valence, and audio features.
                </p>
              </div>
            </div>

            {/* Time Tunnel Preview */}
            <div className="group">
              <div className="relative bg-gradient-to-br from-[#6C5CE7]/20 to-[#FFD93D]/20 rounded-2xl p-8 border border-[#6C5CE7]/30 hover:border-[#6C5CE7]/60 transition-all duration-300">
                <div className="aspect-square bg-[#0a0a1a] rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  {/* Placeholder for Time Tunnel preview */}
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌌</div>
                    <p className="text-gray-400">Time Dilation Tunnel Visualization</p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#6C5CE7] mb-3">
                  Time Dilation Tunnel
                </h3>
                <p className="text-gray-300">
                  Journey through your listening history as a psychedelic tunnel. 
                  See when and how often you listened to each track.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a1a] to-[#1a1a3a]">
        <div className="max-w-4xl mx-auto">
          <CosmicText variant="h2" gradient glow className="text-center mb-16">
            How It Works
          </CosmicText>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Connect Your Spotify",
                description: "One-click authentication with your Spotify account. We only access your listening history and top tracks.",
                icon: "🔗",
              },
              {
                step: "02",
                title: "We Analyze Your Data",
                description: "Our system fetches your top tracks, artists, recently played songs, and audio features. This takes about 5-10 seconds.",
                icon: "⚡",
              },
              {
                step: "03",
                title: "Generate Your Visualizations",
                description: "We create your unique 3D visualizations: the Genetic Audio Helix and Time Dilation Tunnel, plus an AI-generated cosmic story.",
                icon: "✨",
              },
              {
                step: "04",
                title: "Share Your TastePrint",
                description: "Get a unique URL to share your musical DNA with friends. Your analysis is saved forever at tasteprint.com/taste/{your-id}.",
                icon: "🚀",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#6C5CE7] flex items-center justify-center text-2xl font-bold text-white">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4ECDC4] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second CTA */}
          <div className="text-center mt-16">
            <SpotifyConnectButton className="transform hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-1">
                <span className="text-[#4ECDC4]">Taste</span>Print
              </h4>
              <p className="text-sm text-gray-500">
                Discover your musical DNA
              </p>
            </div>

            <div className="flex gap-8">
              <Link
                href="/feed"
                className="text-gray-400 hover:text-[#4ECDC4] transition-colors"
              >
                Discover
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="text-gray-400 hover:text-[#4ECDC4] transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="https://spotify.com"
                target="_blank"
                className="text-gray-400 hover:text-[#4ECDC4] transition-colors"
              >
                Spotify
              </Link>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500">
                Not affiliated with Spotify
              </p>
              <p className="text-xs text-gray-600 mt-1">
                © 2026 TastePrint. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

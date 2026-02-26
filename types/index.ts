// TastePrint TypeScript Types

// ============================================
// SPOTIFY API TYPES
// ============================================

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: SpotifyImage[];
  followers: { total: number };
}

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  external_urls: { spotify: string };
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: SpotifyImage[];
  followers: { total: number };
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string | null;
  images: SpotifyImage[];
  tracks: { total: number };
  owner: { display_name: string; id: string };
}

export interface SpotifyRecentlyPlayed {
  track: SpotifyTrack;
  played_at: string;
  context: {
    type: string;
    href: string | null;
    external_urls: { spotify: string } | null;
    uri: string;
  } | null;
}

export interface SpotifyAudioFeatures {
  id: string;
  acousticness: number;
  danceability: number;
  duration_ms: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  valence: number;
}

// ============================================
// ANALYSIS DATA TYPES
// ============================================

export interface UserMusicData {
  user: {
    spotifyId: string;
    displayName: string;
    email: string;
    images: SpotifyImage[];
    followers: number;
  };
  topTracks: {
    shortTerm: SpotifyTrack[];
    mediumTerm: SpotifyTrack[];
    longTerm: SpotifyTrack[];
  };
  topArtists: {
    shortTerm: SpotifyArtist[];
    mediumTerm: SpotifyArtist[];
    longTerm: SpotifyArtist[];
  };
  recentlyPlayed: SpotifyRecentlyPlayed[];
  audioFeatures: SpotifyAudioFeatures[];
  savedTracksCount: number;
  playlists: SpotifyPlaylist[];
}

export interface GeneticHelixData {
  tracks: GeneticHelixTrack[];
  strands: {
    strandA: { name: string; feature: keyof SpotifyAudioFeatures };
    strandB: { name: string; feature: keyof SpotifyAudioFeatures };
  };
  summary: {
    averageEnergy: number;
    averageValence: number;
    averageDanceability: number;
    averageAcousticness: number;
    dominantMood: string;
    dominantTempo: string;
  };
}

export interface GeneticHelixTrack {
  track: SpotifyTrack;
  position: {
    x: number;
    y: number;
    z: number;
    radius: number;
    angle: number;
    helixHeight: number;
  };
  features: SpotifyAudioFeatures;
  color: string;
  size: number;
}

export interface TimeTunnelData {
  segments: TimeTunnelSegment[];
  totalTracks: number;
  timeRange: {
    start: string;
    end: string;
  };
  listeningHabits: {
    peakHours: string[];
    mostActiveDay: string;
    totalListeningTime: number;
  };
}

export interface TimeTunnelSegment {
  track: SpotifyTrack;
  playedAt: string;
  position: {
    distance: number;
    angle: number;
    tunnelDepth: number;
  };
  frequency: number;
  color: string;
  size: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: string;
}

// ============================================
// DATABASE TYPES
// ============================================

export interface AnalysisDocument {
  publicId: string;
  user: {
    spotifyId: string;
    displayName: string;
    email: string;
    images: SpotifyImage[];
    followers: number;
  };
  data: UserMusicData;
  analysis: {
    geneticHelix: GeneticHelixData;
    timeTunnel: TimeTunnelData;
    aiStory: string;
    timestamp: Date;
    summary: {
      topGenres: string[];
      listeningDiversity: number;
      favoriteDecade: string;
      discoveryScore: number;
    };
  };
  metadata: {
    createdAt: Date;
    isPublic: boolean;
    viewCount: number;
    lastViewedAt?: Date;
  };
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface AnalysisResponse {
  id: string;
  user: AnalysisDocument['user'];
  data: UserMusicData;
  analysis: AnalysisDocument['analysis'];
  metadata: {
    createdAt: string;
    viewCount: number;
  };
}

export interface FeedItem {
  id: string;
  user: {
    displayName: string;
    images: SpotifyImage[];
  };
  preview: {
    topGenre: string;
    trackCount: number;
    dominantMood: string;
  };
  createdAt: string;
  viewCount: number;
}

export interface FeedResponse {
  items: FeedItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface SpotifyConnectButtonProps {
  className?: string;
  onClick?: () => void;
}

export interface GeneticHelixVisualizationProps {
  data: GeneticHelixData;
  isMobile?: boolean;
}

export interface TimeTunnelVisualizationProps {
  data: TimeTunnelData;
  isMobile?: boolean;
}

export interface AnalysisCardProps {
  analysis: FeedItem;
}

export interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export interface LoadingDNAProps {
  messages?: string[];
  interval?: number;
}

// ==========================================
// ERROR TYPES
// ============================================

export interface SpotifyAPIError {
  status: number;
  message: string;
  retryAfter?: number;
}

export interface AnalysisError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

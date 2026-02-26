import mongoose, { Schema, Document } from 'mongoose';
import { nanoid } from 'nanoid';

const SpotifyImageSchema = new Schema({
  url: { type: String, required: true },
  height: { type: Number, default: null },
  width: { type: Number, default: null }
}, { _id: false });

const SpotifyArtistSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  genres: [{ type: String }],
  popularity: { type: Number, default: 0 },
  images: [SpotifyImageSchema],
  followers: {
    total: { type: Number, default: 0 }
  },
  external_urls: {
    spotify: { type: String, required: true }
  }
}, { _id: false });

const SpotifyAlbumSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  images: [SpotifyImageSchema],
  release_date: { type: String, required: true },
  total_tracks: { type: Number, required: true }
}, { _id: false });

const SpotifyTrackSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  artists: [SpotifyArtistSchema],
  album: { type: SpotifyAlbumSchema, required: true },
  duration_ms: { type: Number, required: true },
  explicit: { type: Boolean, default: false },
  popularity: { type: Number, default: 0 },
  preview_url: { type: String, default: null },
  external_urls: {
    spotify: { type: String, required: true }
  }
}, { _id: false });

const SpotifyPlaylistSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  images: [SpotifyImageSchema],
  tracks: {
    total: { type: Number, default: 0 }
  },
  owner: {
    display_name: { type: String, required: true },
    id: { type: String, required: true }
  }
}, { _id: false });

const SpotifyAudioFeaturesSchema = new Schema({
  id: { type: String, required: true },
  acousticness: { type: Number, required: true },
  danceability: { type: Number, required: true },
  duration_ms: { type: Number, required: true },
  energy: { type: Number, required: true },
  instrumentalness: { type: Number, required: true },
  key: { type: Number, required: true },
  liveness: { type: Number, required: true },
  loudness: { type: Number, required: true },
  mode: { type: Number, required: true },
  speechiness: { type: Number, required: true },
  tempo: { type: Number, required: true },
  time_signature: { type: Number, required: true },
  valence: { type: Number, required: true }
}, { _id: false });

const SpotifyRecentlyPlayedSchema = new Schema({
  track: { type: SpotifyTrackSchema, required: true },
  played_at: { type: String, required: true },
  context: {
    type: { type: String, default: null },
    href: { type: String, default: null },
    external_urls: {
      spotify: { type: String, default: null }
    },
    uri: { type: String, default: null }
  }
}, { _id: false });

const UserSchema = new Schema({
  spotifyId: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  images: [SpotifyImageSchema],
  followers: { type: Number, default: 0 }
}, { _id: false });

const GeneticHelixPositionSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
  radius: { type: Number, required: true },
  angle: { type: Number, required: true },
  helixHeight: { type: Number, required: true }
}, { _id: false });

const GeneticHelixTrackSchema = new Schema({
  track: { type: SpotifyTrackSchema, required: true },
  position: { type: GeneticHelixPositionSchema, required: true },
  features: { type: SpotifyAudioFeaturesSchema, required: true },
  color: { type: String, required: true },
  size: { type: Number, required: true }
}, { _id: false });

const GeneticHelixDataSchema = new Schema({
  tracks: [GeneticHelixTrackSchema],
  strands: {
    strandA: {
      name: { type: String, required: true },
      feature: { type: String, required: true }
    },
    strandB: {
      name: { type: String, required: true },
      feature: { type: String, required: true }
    }
  },
  summary: {
    averageEnergy: { type: Number, required: true },
    averageValence: { type: Number, required: true },
    averageDanceability: { type: Number, required: true },
    averageAcousticness: { type: Number, required: true },
    dominantMood: { type: String, required: true },
    dominantTempo: { type: String, required: true }
  }
}, { _id: false });

const TimeTunnelPositionSchema = new Schema({
  distance: { type: Number, required: true },
  angle: { type: Number, required: true },
  tunnelDepth: { type: Number, required: true }
}, { _id: false });

const TimeTunnelSegmentSchema = new Schema({
  track: { type: SpotifyTrackSchema, required: true },
  playedAt: { type: String, required: true },
  position: { type: TimeTunnelPositionSchema, required: true },
  frequency: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: Number, required: true },
  timeOfDay: { type: String, enum: ['morning', 'afternoon', 'evening', 'night'], required: true },
  dayOfWeek: { type: String, required: true }
}, { _id: false });

const TimeTunnelDataSchema = new Schema({
  segments: [TimeTunnelSegmentSchema],
  totalTracks: { type: Number, required: true },
  timeRange: {
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  listeningHabits: {
    peakHours: [{ type: String }],
    mostActiveDay: { type: String, required: true },
    totalListeningTime: { type: Number, required: true }
  }
}, { _id: false });

const AnalysisDataSchema = new Schema({
  geneticHelix: { type: GeneticHelixDataSchema, required: true },
  timeTunnel: { type: TimeTunnelDataSchema, required: true },
  aiStory: { type: String, required: true },
  timestamp: { type: Date, required: true },
  summary: {
    topGenres: [{ type: String }],
    listeningDiversity: { type: Number, required: true },
    favoriteDecade: { type: String, required: true },
    discoveryScore: { type: Number, required: true }
  }
}, { _id: false });

const UserMusicDataSchema = new Schema({
  user: { type: UserSchema, required: true },
  topTracks: {
    shortTerm: [SpotifyTrackSchema],
    mediumTerm: [SpotifyTrackSchema],
    longTerm: [SpotifyTrackSchema]
  },
  topArtists: {
    shortTerm: [SpotifyArtistSchema],
    mediumTerm: [SpotifyArtistSchema],
    longTerm: [SpotifyArtistSchema]
  },
  recentlyPlayed: [SpotifyRecentlyPlayedSchema],
  audioFeatures: [SpotifyAudioFeaturesSchema],
  savedTracksCount: { type: Number, default: 0 },
  playlists: [SpotifyPlaylistSchema]
}, { _id: false });

const AnalysisMetadataSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: true },
  viewCount: { type: Number, default: 0 },
  lastViewedAt: { type: Date, default: null }
}, { _id: false });

const AnalysisSchema = new Schema({
  publicId: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(10)
  },
  user: { type: UserSchema, required: true },
  data: { type: UserMusicDataSchema, required: true },
  analysis: { type: AnalysisDataSchema, required: true },
  metadata: { type: AnalysisMetadataSchema, default: () => ({}) }
});

AnalysisSchema.index({ publicId: 1 });
AnalysisSchema.index({ 'metadata.createdAt': -1 });
AnalysisSchema.index({ 'metadata.isPublic': 1, 'metadata.createdAt': -1 });

const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);

export default Analysis;

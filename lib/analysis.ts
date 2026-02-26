import {
  SpotifyTrack,
  SpotifyArtist,
  SpotifyRecentlyPlayed,
  SpotifyAudioFeatures,
  UserMusicData,
  GeneticHelixData,
  TimeTunnelData,
} from '../types';

export class AnalysisProcessor {
  private data: UserMusicData;

  constructor(data: UserMusicData) {
    this.data = data;
  }

  processGeneticHelix(): GeneticHelixData {
    const allTracks = [
      ...this.data.topTracks.shortTerm,
      ...this.data.topTracks.mediumTerm,
      ...this.data.topTracks.longTerm,
    ];

    const trackFeaturesMap = new Map<string, SpotifyAudioFeatures>();
    this.data.audioFeatures.forEach(feature => {
      trackFeaturesMap.set(feature.id, feature);
    });

    const uniqueTracks = allTracks.filter((track, index, self) =>
      index === self.findIndex(t => t.id === track.id)
    ).slice(0, 50);

    const tracks = uniqueTracks.map((track, index) => {
      const features = trackFeaturesMap.get(track.id) || this.buildSyntheticFeatures(track);
      const popularity = this.safeNumber(track.popularity, 50);

      const angle = (index / uniqueTracks.length) * Math.PI * 2;
      const helixHeight = (index / uniqueTracks.length) * 10 - 5;
      const radius = 3 + (features.energy * 2);

      return {
        track,
        position: {
          x: Math.cos(angle) * radius,
          y: helixHeight,
          z: Math.sin(angle) * radius,
          radius,
          angle,
          helixHeight,
        },
        features,
        color: this.getColorFromValence(features.valence, features.energy),
        size: this.safeNumber(0.3 + (popularity / 100) * 0.5, 0.5),
      };
    }).filter(Boolean) as GeneticHelixData['tracks'];

    const avgEnergy = this.average(tracks.map(t => t.features.energy));
    const avgValence = this.average(tracks.map(t => t.features.valence));
    const avgDanceability = this.average(tracks.map(t => t.features.danceability));
    const avgAcousticness = this.average(tracks.map(t => t.features.acousticness));

    return {
      tracks,
      strands: {
        strandA: { name: 'Energy Spectrum', feature: 'energy' },
        strandB: { name: 'Mood Spectrum', feature: 'valence' },
      },
      summary: {
        averageEnergy: avgEnergy,
        averageValence: avgValence,
        averageDanceability: avgDanceability,
        averageAcousticness: avgAcousticness,
        dominantMood: this.getDominantMood(avgValence, avgEnergy),
        dominantTempo: this.getDominantTempo(this.average(tracks.map(t => t.features.tempo))),
      },
    };
  }

  processTimeTunnel(): TimeTunnelData {
    const segments = this.data.recentlyPlayed.map((item, index) => {
      const playedDate = new Date(item.played_at);
      const now = new Date();
      const daysAgo = (now.getTime() - playedDate.getTime()) / (1000 * 60 * 60 * 24);
      
      const tunnelDepth = Math.min(daysAgo / 30, 10);
      const angle = (index / this.data.recentlyPlayed.length) * Math.PI * 2;
      const distance = 2 + tunnelDepth;

      const hour = playedDate.getHours();
      let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
      if (hour >= 5 && hour < 12) timeOfDay = 'morning';
      else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
      else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
      else timeOfDay = 'night';

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = days[playedDate.getDay()];

      const popularity = this.safeNumber(item.track.popularity, 50);

      const size = this.safeNumber(0.4 + (popularity / 100) * 0.4, 0.6);

      return {
        track: item.track,
        playedAt: item.played_at,
        position: {
          distance,
          angle,
          tunnelDepth,
        },
        frequency: 1,
        color: this.getTimeOfDayColor(timeOfDay),
        size,
        timeOfDay,
        dayOfWeek,
      };
    });

    const timeRange = {
      start: this.data.recentlyPlayed[this.data.recentlyPlayed.length - 1]?.played_at || new Date().toISOString(),
      end: this.data.recentlyPlayed[0]?.played_at || new Date().toISOString(),
    };

    const hourCounts = new Map<string, number>();
    const dayCounts = new Map<string, number>();
    let totalListeningTime = 0;

    this.data.recentlyPlayed.forEach(item => {
      const hour = new Date(item.played_at).getHours();
      const day = new Date(item.played_at).getDay();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      hourCounts.set(`${hour}:00`, (hourCounts.get(`${hour}:00`) || 0) + 1);
      dayCounts.set(days[day], (dayCounts.get(days[day]) || 0) + 1);
      totalListeningTime += item.track.duration_ms;
    });

    const peakHours = Array.from(hourCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([hour]) => hour);

    const mostActiveDay = Array.from(dayCounts.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

    return {
      segments,
      totalTracks: segments.length,
      timeRange,
      listeningHabits: {
        peakHours,
        mostActiveDay,
        totalListeningTime,
      },
    };
  }

  private getColorFromValence(valence: number, energy: number): string {
    const hue = valence * 120 + (energy > 0.5 ? 180 : 0);
    const saturation = 70 + energy * 30;
    const lightness = 50 + valence * 20;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  private getDominantMood(valence: number, energy: number): string {
    if (valence > 0.6 && energy > 0.6) return 'Euphoric';
    if (valence > 0.6 && energy <= 0.6) return 'Chill & Happy';
    if (valence <= 0.6 && energy > 0.6) return 'Intense';
    return 'Melancholic';
  }

  private getDominantTempo(tempo: number): string {
    if (tempo < 80) return 'Slow & Atmospheric';
    if (tempo < 120) return 'Moderate & Groovy';
    if (tempo < 140) return 'Upbeat & Energetic';
    return 'Fast & Intense';
  }

  private getTimeOfDayColor(timeOfDay: string): string {
    const colors: Record<string, string> = {
      morning: '#FFD93D',
      afternoon: '#FF6B6B',
      evening: '#4ECDC4',
      night: '#6C5CE7',
    };
    return colors[timeOfDay] || '#FFFFFF';
  }

  private average(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  private safeNumber(value: number | null | undefined, fallback: number): number {
    if (typeof value !== 'number') return fallback;
    if (Number.isNaN(value) || !Number.isFinite(value)) return fallback;
    return value;
  }

  private buildSyntheticFeatures(track: SpotifyTrack): SpotifyAudioFeatures {
    const baseSeed = this.hashString(track.id || track.name);
    const energy = this.unitFromSeed(baseSeed + 1);
    const valence = this.unitFromSeed(baseSeed + 2);
    const danceability = this.unitFromSeed(baseSeed + 3);
    const acousticness = this.unitFromSeed(baseSeed + 4);
    const instrumentalness = this.unitFromSeed(baseSeed + 5);
    const liveness = this.unitFromSeed(baseSeed + 6);
    const speechiness = this.unitFromSeed(baseSeed + 7);
    const tempo = this.rangeFromSeed(baseSeed + 8, 60, 180);
    const loudness = this.rangeFromSeed(baseSeed + 9, -30, -5);
    const key = Math.floor(this.rangeFromSeed(baseSeed + 10, 0, 11.999));
    const mode = this.unitFromSeed(baseSeed + 11) > 0.5 ? 1 : 0;
    const time_signature = Math.floor(this.rangeFromSeed(baseSeed + 12, 3, 7.999));

    return {
      id: track.id,
      acousticness,
      danceability,
      duration_ms: track.duration_ms,
      energy,
      instrumentalness,
      key,
      liveness,
      loudness,
      mode,
      speechiness,
      tempo,
      time_signature,
      valence,
    };
  }

  private hashString(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  private unitFromSeed(seed: number): number {
    const normalized = (seed >>> 0) / 4294967295;
    return Math.min(Math.max(normalized, 0), 1);
  }

  private rangeFromSeed(seed: number, min: number, max: number): number {
    return min + this.unitFromSeed(seed) * (max - min);
  }
}

export default AnalysisProcessor;

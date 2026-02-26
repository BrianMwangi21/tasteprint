import {
  SpotifyTrack,
  SpotifyArtist,
  SpotifyPlaylist,
  SpotifyRecentlyPlayed,
  SpotifyAudioFeatures,
} from '../types';

import { getSessionAccessToken } from './session';
import { getValidAccessToken, SpotifyTokens, SpotifyUserProfile } from './spotify-auth';

class SpotifyAPI {
  private async fetchWithAuth(
    endpoint: string,
    tokens?: SpotifyTokens
  ): Promise<Response> {
    let accessToken: string;
    
    if (tokens) {
      accessToken = await getValidAccessToken(tokens);
    } else {
      accessToken = await getSessionAccessToken() || '';
    }
    
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        throw new Error(`Rate limited. Retry after ${retryAfter} seconds`);
      }
      
      const error = await response.text();
      throw new Error(`Spotify API error: ${response.status} - ${error}`);
    }

    return response;
  }

  async getCurrentUser(tokens?: SpotifyTokens): Promise<SpotifyUserProfile> {
    const response = await this.fetchWithAuth('/me', tokens);
    return response.json();
  }

  async getTopTracks(
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit: number = 50,
    tokens?: SpotifyTokens
  ): Promise<SpotifyTrack[]> {
    const response = await this.fetchWithAuth(
      `/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
      tokens
    );
    const data = await response.json();
    return data.items;
  }

  async getTopArtists(
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit: number = 50,
    tokens?: SpotifyTokens
  ): Promise<SpotifyArtist[]> {
    const response = await this.fetchWithAuth(
      `/me/top/artists?time_range=${timeRange}&limit=${limit}`,
      tokens
    );
    const data = await response.json();
    return data.items;
  }

  async getRecentlyPlayed(
    limit: number = 50,
    tokens?: SpotifyTokens
  ): Promise<SpotifyRecentlyPlayed[]> {
    const response = await this.fetchWithAuth(
      `/me/player/recently-played?limit=${limit}`,
      tokens
    );
    const data = await response.json();
    return data.items;
  }

  async getAudioFeatures(
    trackIds: string[],
    tokens?: SpotifyTokens
  ): Promise<SpotifyAudioFeatures[]> {
    if (trackIds.length === 0) return [];
    
    const response = await this.fetchWithAuth(
      `/audio-features?ids=${trackIds.slice(0, 100).join(',')}`,
      tokens
    );
    const data = await response.json();
    return data.audio_features.filter(Boolean);
  }

  async getSavedTracksCount(tokens?: SpotifyTokens): Promise<number> {
    const response = await this.fetchWithAuth('/me/tracks?limit=1', tokens);
    const data = await response.json();
    return data.total;
  }

  async getPlaylists(
    limit: number = 50,
    tokens?: SpotifyTokens
  ): Promise<SpotifyPlaylist[]> {
    const response = await this.fetchWithAuth(
      `/me/playlists?limit=${limit}`,
      tokens
    );
    const data = await response.json();
    return data.items;
  }

  async getAllUserData(tokens?: SpotifyTokens): Promise<{
    user: SpotifyUserProfile;
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
  }> {
    const [
      user,
      topTracksShort,
      topTracksMedium,
      topTracksLong,
      topArtistsShort,
      topArtistsMedium,
      topArtistsLong,
      recentlyPlayed,
      savedTracksCount,
      playlists,
    ] = await Promise.all([
      this.getCurrentUser(tokens),
      this.getTopTracks('short_term', 50, tokens),
      this.getTopTracks('medium_term', 50, tokens),
      this.getTopTracks('long_term', 50, tokens),
      this.getTopArtists('short_term', 50, tokens),
      this.getTopArtists('medium_term', 50, tokens),
      this.getTopArtists('long_term', 50, tokens),
      this.getRecentlyPlayed(50, tokens),
      this.getSavedTracksCount(tokens),
      this.getPlaylists(50, tokens),
    ]);

    const allTrackIds = [
      ...topTracksShort.map(t => t.id),
      ...topTracksMedium.map(t => t.id),
      ...topTracksLong.map(t => t.id),
      ...recentlyPlayed.map(rp => rp.track.id),
    ].filter((id, index, self) => self.indexOf(id) === index);

    let audioFeatures: SpotifyAudioFeatures[] = [];
    
    for (let i = 0; i < allTrackIds.length; i += 100) {
      const batch = allTrackIds.slice(i, i + 100);
      const batchFeatures = await this.getAudioFeatures(batch, tokens);
      audioFeatures = [...audioFeatures, ...batchFeatures];
    }

    return {
      user,
      topTracks: {
        shortTerm: topTracksShort,
        mediumTerm: topTracksMedium,
        longTerm: topTracksLong,
      },
      topArtists: {
        shortTerm: topArtistsShort,
        mediumTerm: topArtistsMedium,
        longTerm: topArtistsLong,
      },
      recentlyPlayed,
      audioFeatures,
      savedTracksCount,
      playlists,
    };
  }
}

const spotify = new SpotifyAPI();
export default spotify;

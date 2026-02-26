import { NextRequest, NextResponse } from 'next/server';
import spotify from '@/lib/spotify';
import AnalysisProcessor from '@/lib/analysis';
import { generateTasteStory } from '@/lib/openrouter';
import connectToDatabase from '@/lib/mongodb';
import Analysis from '@/models/Analysis';
import { requireAuth } from '@/lib/session';
import { UserMusicData } from '@/types';

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function calculateDiversity(data: UserMusicData): number {
  const uniqueArtists = new Set([
    ...data.topTracks.mediumTerm.map((t) => t.artists[0]?.id),
    ...data.recentlyPlayed.map((rp) => rp.track.artists[0]?.id),
  ]).size;
  
  const totalTracks = data.topTracks.mediumTerm.length + data.recentlyPlayed.length;
  return Math.min((uniqueArtists / totalTracks) * 100, 100);
}

function calculateDiscoveryScore(data: UserMusicData): number {
  const obscureArtists = data.topArtists.mediumTerm.filter((a) => a.popularity < 50).length;
  return Math.min((obscureArtists / data.topArtists.mediumTerm.length) * 100, 100);
}

export async function POST(request: NextRequest) {
  try {
    console.info('[analyze] request origin', request.nextUrl.origin);
    console.info('[analyze] cookie header present', Boolean(request.headers.get('cookie')));
    const { tokens, user } = await requireAuth();
    console.info('[analyze] authenticated user', user.id);
    
    await connectToDatabase();
    
    const rawData = await spotify.getAllUserData(tokens);
    
    const userData: UserMusicData = {
      user: {
        spotifyId: user.id,
        displayName: user.display_name,
        email: user.email,
        images: user.images,
        followers: user.followers.total,
      },
      topTracks: rawData.topTracks,
      topArtists: rawData.topArtists,
      recentlyPlayed: rawData.recentlyPlayed,
      audioFeatures: rawData.audioFeatures,
      savedTracksCount: rawData.savedTracksCount,
      playlists: rawData.playlists,
    };
    
    const processor = new AnalysisProcessor(userData);
    const geneticHelix = processor.processGeneticHelix();
    const timeTunnel = processor.processTimeTunnel();
    
    const aiStory = await generateTasteStory(userData);
    
    const allArtists = [
      ...userData.topArtists.shortTerm,
      ...userData.topArtists.mediumTerm,
      ...userData.topArtists.longTerm,
      ...userData.recentlyPlayed.flatMap(rp => rp.track.artists)
    ];
    const topGenres = [...new Set(allArtists.flatMap(a => a.genres))]
      .filter(g => g && g.trim().length > 0)
      .slice(0, 10);
    const allYears = userData.topTracks.mediumTerm.map(t => 
      parseInt(t.album.release_date.split('-')[0])
    ).filter(y => !isNaN(y));
    const favoriteDecade = allYears.length > 0 
      ? `${Math.floor(average(allYears) / 10) * 10}s` 
      : 'Unknown';
    
    const analysis = new Analysis({
      user: {
        spotifyId: user.id,
        displayName: user.display_name,
        email: user.email,
        images: user.images,
        followers: user.followers.total,
      },
      data: userData,
      analysis: {
        geneticHelix,
        timeTunnel,
        aiStory,
        timestamp: new Date(),
        summary: {
          topGenres,
          listeningDiversity: calculateDiversity(userData),
          favoriteDecade,
          discoveryScore: calculateDiscoveryScore(userData),
        },
      },
    });
    
    await analysis.save();
    
    return NextResponse.json({ 
      success: true, 
      publicId: analysis.publicId,
      redirectUrl: `/taste/${analysis.publicId}`,
    });
    
  } catch (error) {
    console.error('Analysis creation error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create analysis' },
      { status: 500 }
    );
  }
}

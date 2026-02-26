import { NextResponse } from 'next/server';
import { getSpotifyAuthUrl, generateState } from '@/lib/spotify-auth';

export async function GET() {
  try {
    const state = generateState();
    const authUrl = getSpotifyAuthUrl(state);
    
    const response = NextResponse.redirect(authUrl);
    
    response.cookies.set('spotify_auth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Spotify authentication' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { getSpotifyAuthUrl, generateState } from '@/lib/spotify-auth';

export async function GET(request: Request) {
  try {
    // Get the origin from the request to construct the proper callback URL
    const requestUrl = new URL(request.url);
    const origin = requestUrl.origin;
    
    // Construct the callback URL dynamically based on current origin
    const redirectUri = `${origin}/api/auth/spotify/callback`;
    
    const state = generateState();
    const authUrl = getSpotifyAuthUrl(state, redirectUri);
    
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

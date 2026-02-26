import { NextResponse } from 'next/server';
import { 
  exchangeCodeForTokens, 
  verifyState, 
  getSpotifyUserProfile,
  SpotifyTokens 
} from '@/lib/spotify-auth';

export async function GET(request: Request) {
  // Get the origin from the request URL at the start
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(error)}`, origin)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('No authorization code received')}`, origin)
      );
    }

    const cookies = request.headers.get('cookie');
    const stateCookie = cookies
      ?.split(';')
      .find(c => c.trim().startsWith('spotify_auth_state='))
      ?.split('=')[1];

    if (!stateCookie || !verifyState(state || '')) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('Invalid or expired state')}`, origin)
      );
    }

    const tokens = await exchangeCodeForTokens(code);
    const userProfile = await getSpotifyUserProfile(tokens.access_token);

    // Use the origin for redirect to preserve the exact hostname
    const response = NextResponse.redirect(new URL('/analyze', origin));

    response.cookies.set('spotify_tokens', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    response.cookies.set('spotify_user', JSON.stringify(userProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    response.cookies.delete('spotify_auth_state');

    return response;
  } catch (error) {
    console.error('Callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(errorMessage)}`, origin)
    );
  }
}

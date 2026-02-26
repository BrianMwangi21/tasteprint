import { NextResponse } from 'next/server';
import { 
  exchangeCodeForTokens, 
  verifyState, 
  getSpotifyUserProfile,
  SpotifyTokens 
} from '@/lib/spotify-auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('No authorization code received')}`, request.url)
      );
    }

    const cookies = request.headers.get('cookie');
    const stateCookie = cookies
      ?.split(';')
      .find(c => c.trim().startsWith('spotify_auth_state='))
      ?.split('=')[1];

    if (!stateCookie || !verifyState(state || '')) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('Invalid or expired state')}`, request.url)
      );
    }

    const tokens = await exchangeCodeForTokens(code);
    const userProfile = await getSpotifyUserProfile(tokens.access_token);

    const response = NextResponse.redirect(new URL('/analyze', request.url));

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
      new URL(`/?error=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}

import { NextResponse } from 'next/server';
import { 
  exchangeCodeForTokens, 
  verifyState, 
  getSpotifyUserProfile,
  SpotifyTokens 
} from '@/lib/spotify-auth';

export async function GET(request: Request) {
  const redirectOrigin = process.env.SPOTIFY_REDIRECT_TARGET
    ? new URL(process.env.SPOTIFY_REDIRECT_TARGET).origin
    : new URL(request.url).origin;
  try {
    const requestUrl = new URL(request.url);
    console.info('[spotify-callback] request origin', requestUrl.origin);
    console.info('[spotify-callback] redirect origin', redirectOrigin);
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(error)}`, redirectOrigin)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('No authorization code received')}`, redirectOrigin)
      );
    }

    const cookies = request.headers.get('cookie');
    console.info('[spotify-callback] cookies present', Boolean(cookies));
    const stateCookie = cookies
      ?.split(';')
      .find(c => c.trim().startsWith('spotify_auth_state='))
      ?.split('=')[1];
    console.info('[spotify-callback] state cookie present', Boolean(stateCookie));

    if (!stateCookie || !verifyState(state || '')) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('Invalid or expired state')}`, redirectOrigin)
      );
    }

    const tokens = await exchangeCodeForTokens(code);
    const userProfile = await getSpotifyUserProfile(tokens.access_token);
    console.info('[spotify-callback] user profile id', userProfile.id);

    const response = NextResponse.redirect(new URL('/analyze', redirectOrigin));

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
    console.info('[spotify-callback] cookies set, redirecting to /analyze');

    return response;
  } catch (error) {
    console.error('Callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(errorMessage)}`, redirectOrigin)
    );
  }
}

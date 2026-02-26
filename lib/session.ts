import { cookies } from 'next/headers';
import { SpotifyTokens, SpotifyUserProfile, getValidAccessToken } from './spotify-auth';

const TOKENS_COOKIE = 'spotify_tokens';
const USER_COOKIE = 'spotify_user';

export async function getSessionTokens(): Promise<SpotifyTokens | null> {
  try {
    const cookieStore = await cookies();
    const tokensCookie = cookieStore.get(TOKENS_COOKIE);
    
    if (!tokensCookie?.value) {
      return null;
    }
    
    return JSON.parse(tokensCookie.value);
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SpotifyUserProfile | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get(USER_COOKIE);
    
    if (!userCookie?.value) {
      return null;
    }
    
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}

export async function getSessionAccessToken(): Promise<string | null> {
  const tokens = await getSessionTokens();
  
  if (!tokens) {
    return null;
  }
  
  try {
    return await getValidAccessToken(tokens);
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const tokens = await getSessionTokens();
  const user = await getSessionUser();
  return !!(tokens && user);
}

export async function requireAuth(): Promise<{ tokens: SpotifyTokens; user: SpotifyUserProfile }> {
  const tokens = await getSessionTokens();
  const user = await getSessionUser();
  
  if (!tokens || !user) {
    throw new Error('Authentication required');
  }
  
  return { tokens, user };
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKENS_COOKIE);
  cookieStore.delete(USER_COOKIE);
}

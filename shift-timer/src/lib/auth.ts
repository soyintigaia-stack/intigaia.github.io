import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function getValidToken(): Promise<string | null> {
  const store = await cookies();
  const token = store.get('google_access_token')?.value;
  const expiry = store.get('google_token_expiry')?.value;
  const refreshToken = store.get('google_refresh_token')?.value;

  if (!token) return null;

  const expiryMs = Number(expiry ?? 0);
  if (Date.now() > expiryMs - 60_000 && refreshToken) {
    return refreshAccessToken(refreshToken);
  }

  return token;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const data = await res.json();
  if (!data.access_token) return null;

  const store = await cookies();
  const opts = { httpOnly: true, secure: true, path: '/', maxAge: 30 * 86400 } as const;
  store.set('google_access_token', data.access_token, opts);
  store.set('google_token_expiry', String(Date.now() + data.expires_in * 1000), opts);

  return data.access_token as string;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

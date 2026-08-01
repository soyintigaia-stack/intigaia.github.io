import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  const store = await cookies();
  const storedState = store.get('oauth_state')?.value;

  if (error || !code || !state || state !== storedState) {
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      grant_type: 'authorization_code',
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.access_token) {
    return NextResponse.redirect(new URL('/?error=token_failed', request.url));
  }

  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 30 * 86400,
  } as const;

  store.set('google_access_token', tokens.access_token as string, opts);
  store.set('google_token_expiry', String(Date.now() + (tokens.expires_in as number) * 1000), opts);
  if (tokens.refresh_token) {
    store.set('google_refresh_token', tokens.refresh_token as string, opts);
  }
  store.delete('oauth_state');

  return NextResponse.redirect(new URL('/', request.url));
}

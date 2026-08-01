import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const store = await cookies();
  store.delete('google_access_token');
  store.delete('google_refresh_token');
  store.delete('google_token_expiry');
  return NextResponse.redirect(new URL('/', request.url));
}

import { NextResponse } from 'next/server';
import { getValidToken, unauthorizedResponse } from '@/lib/auth';
import { fetchCalendars } from '@/lib/google';
import type { Calendar } from '@/types';

export async function GET() {
  const token = await getValidToken();
  if (!token) return unauthorizedResponse();

  try {
    const data = await fetchCalendars(token);
    const calendars: Calendar[] = (data.items ?? []).map((c: Record<string, unknown>) => ({
      id: c.id,
      summary: c.summary,
      backgroundColor: c.backgroundColor,
      primary: c.primary,
    }));
    return NextResponse.json({ calendars });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch calendars' }, { status: 500 });
  }
}

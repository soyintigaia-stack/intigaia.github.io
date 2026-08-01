import { NextRequest, NextResponse } from 'next/server';
import { getValidToken, unauthorizedResponse } from '@/lib/auth';
import { fetchEvents } from '@/lib/google';
import type { CalendarEvent } from '@/types';

export async function GET(request: NextRequest) {
  const token = await getValidToken();
  if (!token) return unauthorizedResponse();

  const { searchParams } = request.nextUrl;
  const calendarId = searchParams.get('calendarId');
  const timeMin = searchParams.get('timeMin');
  const timeMax = searchParams.get('timeMax');

  if (!calendarId || !timeMin || !timeMax) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const data = await fetchEvents(token, calendarId, timeMin, timeMax);
    // Only return timed events (not all-day)
    const events: CalendarEvent[] = (data.items ?? []).filter(
      (e: CalendarEvent) => !!e.start?.dateTime
    );
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

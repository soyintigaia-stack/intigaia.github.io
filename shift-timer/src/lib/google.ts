const BASE = 'https://www.googleapis.com/calendar/v3';

export async function fetchCalendars(token: string) {
  const res = await fetch(`${BASE}/users/me/calendarList`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch calendars');
  return res.json();
}

export async function fetchEvents(
  token: string,
  calendarId: string,
  timeMin: string,
  timeMax: string
) {
  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '50',
  });
  const url = `${BASE}/calendars/${encodeURIComponent(calendarId)}/events?${params}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

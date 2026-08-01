export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  colorId?: string;
}

export interface Calendar {
  id: string;
  summary: string;
  backgroundColor?: string;
  primary?: boolean;
}

export type AlertType = 'none' | 'warning' | 'overtime';

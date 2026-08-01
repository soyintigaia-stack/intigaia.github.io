'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Calendar, CalendarEvent, AlertType } from '@/types';

// ── Helpers ─────────────────────────────────────────────────────────────────

function fmt(totalSeconds: number, showSign = false): string {
  const neg = totalSeconds < 0;
  const abs = Math.abs(Math.round(totalSeconds));
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  const sign = neg ? '-' : showSign ? '+' : '';
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${sign}${h}:${mm}:${ss}` : `${sign}${mm}:${ss}`;
}

function fmtHour(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function splitTitle(summary: string): { client: string; procedure: string } {
  for (const sep of [' - ', ' | ', ' – ', '\n', ' / ']) {
    const i = summary.indexOf(sep);
    if (i > 0) return { client: summary.slice(0, i).trim(), procedure: summary.slice(i + sep.length).trim() };
  }
  return { client: summary.trim(), procedure: '' };
}

function barColor(progress: number, remainingSec: number): string {
  if (remainingSec < 0) return 'bg-red-600';
  if (remainingSec <= 600) return 'bg-red-500';
  if (progress >= 0.65) return 'bg-yellow-400';
  return 'bg-emerald-400';
}

// ── Audio alerts ─────────────────────────────────────────────────────────────

function beep(freq: number, dur: number, vol = 0.45) {
  try {
    type WebkitAC = typeof AudioContext;
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: WebkitAC }).webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch { /* no audio support */ }
}

function alertWarning() {
  beep(880, 0.35);
  setTimeout(() => beep(880, 0.35), 450);
  setTimeout(() => beep(1108, 0.55), 900);
}

function alertOvertime() {
  [0, 280, 560, 840, 1120].forEach(d => setTimeout(() => beep(440, 0.28), d));
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ShiftTimerApp() {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [calId, setCalId] = useState('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [now, setNow] = useState(() => new Date());
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Manual timer
  const [manualMode, setManualMode] = useState(false);
  const [manualStartMs, setManualStartMs] = useState<number | null>(null);
  const [accPausedMs, setAccPausedMs] = useState(0);
  const [pausedAtMs, setPausedAtMs] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const alertsDone = useRef<Record<string, Partial<Record<AlertType, true>>>>({});

  // Clock tick
  useEffect(() => {
    const id = setInterval(() => {
      if (!(isPaused && manualMode)) setNow(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, [isPaused, manualMode]);

  // Load calendars once
  useEffect(() => {
    fetch('/api/calendars')
      .then(r => {
        if (r.status === 401) { window.location.href = '/api/auth/login'; return null; }
        return r.json();
      })
      .then(data => {
        if (!data) return;
        const list: Calendar[] = data.calendars ?? [];
        setCalendars(list);
        const saved = localStorage.getItem('turno_cal');
        const primary = list.find(c => c.primary)?.id ?? list[0]?.id ?? '';
        setCalId(list.find(c => c.id === saved)?.id ?? primary);
      })
      .catch(() => setFetchError('Error cargando calendarios.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (calId) localStorage.setItem('turno_cal', calId);
  }, [calId]);

  const loadEvents = useCallback(async (id: string) => {
    if (!id) return;
    const d = new Date();
    const start = new Date(d); start.setHours(0, 0, 0, 0);
    const end = new Date(d); end.setHours(23, 59, 59, 999);
    try {
      const r = await fetch(
        `/api/events?calendarId=${encodeURIComponent(id)}&timeMin=${start.toISOString()}&timeMax=${end.toISOString()}`
      );
      if (!r.ok) throw new Error();
      const data = await r.json();
      setEvents(data.events ?? []);
      setFetchError(null);
    } catch {
      setFetchError('Error cargando turnos. Verificá tu conexión.');
    }
  }, []);

  useEffect(() => { if (calId) loadEvents(calId); }, [calId, loadEvents]);

  // Auto-refresh every 5 min
  useEffect(() => {
    if (!calId) return;
    const id = setInterval(() => loadEvents(calId), 5 * 60_000);
    return () => clearInterval(id);
  }, [calId, loadEvents]);

  // Reset manual timer when event changes
  const nowMs = now.getTime();

  const currentEvent = events.find(e => {
    if (!e.start.dateTime || !e.end.dateTime) return false;
    const s = new Date(e.start.dateTime).getTime();
    const en = new Date(e.end.dateTime).getTime();
    return s <= nowMs && en > nowMs;
  }) ?? null;

  const nextEvent = events.find(e => {
    if (!e.start.dateTime) return false;
    return new Date(e.start.dateTime).getTime() > nowMs;
  }) ?? null;

  // Timer math
  const timer = (() => {
    if (!currentEvent?.start?.dateTime || !currentEvent?.end?.dateTime) return null;
    const evStart = new Date(currentEvent.start.dateTime).getTime();
    const evEnd = new Date(currentEvent.end.dateTime).getTime();
    const totalMs = evEnd - evStart;

    let elapsedMs: number;
    if (manualMode && manualStartMs !== null) {
      const runningMs = isPaused && pausedAtMs !== null
        ? pausedAtMs - manualStartMs - accPausedMs
        : nowMs - manualStartMs - accPausedMs;
      elapsedMs = Math.max(0, runningMs);
    } else {
      elapsedMs = nowMs - evStart;
    }

    const remainingMs = totalMs - elapsedMs;
    return {
      elapsed: elapsedMs / 1000,
      remaining: remainingMs / 1000,
      progress: Math.min(1, Math.max(0, elapsedMs / totalMs)),
    };
  })();

  // Alert logic
  useEffect(() => {
    if (!currentEvent || !timer) return;
    const id = currentEvent.id;
    if (!alertsDone.current[id]) alertsDone.current[id] = {};
    const done = alertsDone.current[id];

    if (timer.remaining <= 600 && timer.remaining > 0 && !done.warning) {
      done.warning = true;
      alertWarning();
    }
    if (timer.remaining <= 0 && !done.overtime) {
      done.overtime = true;
      alertOvertime();
    }
  }, [currentEvent, timer]);

  // Manual controls
  function startManual() {
    setManualMode(true);
    setManualStartMs(Date.now());
    setAccPausedMs(0);
    setPausedAtMs(null);
    setIsPaused(false);
  }

  function togglePause() {
    if (!manualMode) return;
    if (isPaused) {
      const elapsed = pausedAtMs ? Date.now() - pausedAtMs : 0;
      setAccPausedMs(p => p + elapsed);
      setPausedAtMs(null);
      setIsPaused(false);
    } else {
      setPausedAtMs(Date.now());
      setIsPaused(true);
    }
  }

  function resetAuto() {
    setManualMode(false);
    setManualStartMs(null);
    setAccPausedMs(0);
    setPausedAtMs(null);
    setIsPaused(false);
  }

  const alertType: AlertType = !timer ? 'none'
    : timer.remaining <= 0 ? 'overtime'
    : timer.remaining <= 600 ? 'warning'
    : 'none';

  const selCal = calendars.find(c => c.id === calId);

  // ── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin" />
          <p className="text-zinc-500 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  const { client, procedure } = currentEvent ? splitTitle(currentEvent.summary) : { client: '', procedure: '' };

  return (
    <div className="min-h-screen flex flex-col select-none">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur sticky top-0 z-10">
        <select
          value={calId}
          onChange={e => setCalId(e.target.value)}
          className="bg-transparent text-zinc-200 text-sm font-medium focus:outline-none cursor-pointer max-w-[200px] truncate"
          aria-label="Seleccionar calendario"
        >
          {calendars.map(c => (
            <option key={c.id} value={c.id} className="bg-zinc-900 text-zinc-100">
              {c.summary}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-3">
          {manualMode && (
            <span className="text-xs font-mono bg-amber-900/50 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded-full">
              MANUAL
            </span>
          )}
          <span className="text-zinc-500 text-xs tabular-nums font-mono hidden sm:block">
            {now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </span>
          <a
            href="/api/auth/logout"
            className="text-zinc-700 hover:text-zinc-400 transition-colors text-lg leading-none"
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            ×
          </a>
        </div>
      </header>

      {fetchError && (
        <div className="bg-red-950/40 border-b border-red-900/40 px-4 py-2 text-center">
          <p className="text-red-400 text-xs">{fetchError}</p>
        </div>
      )}

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ── Timer panel ── */}
        <div className={`flex-1 flex flex-col items-center justify-center p-5 gap-6 transition-colors duration-700 ${
          alertType === 'overtime' ? 'bg-red-950/25'
          : alertType === 'warning' ? 'bg-yellow-950/15'
          : ''
        }`}>

          {currentEvent ? (
            <>
              {/* Client + treatment */}
              <div className="text-center w-full max-w-md space-y-1 px-2">
                <h2 className={`text-4xl sm:text-5xl font-bold leading-tight break-words ${
                  alertType === 'overtime' ? 'text-red-300 animate-pulse'
                  : alertType === 'warning' ? 'text-yellow-200'
                  : 'text-zinc-50'
                }`}>
                  {client}
                </h2>
                {procedure && (
                  <p className={`text-base sm:text-xl font-medium ${
                    alertType === 'overtime' ? 'text-red-400/80'
                    : alertType === 'warning' ? 'text-yellow-400/80'
                    : 'text-zinc-400'
                  }`}>
                    {procedure}
                  </p>
                )}
                <p className="text-zinc-600 text-sm tabular-nums font-mono">
                  {fmtHour(currentEvent.start.dateTime!)} → {fmtHour(currentEvent.end.dateTime!)}
                </p>
              </div>

              {/* Big numbers */}
              {timer && (
                <div className="w-full max-w-sm space-y-5">

                  {/* Elapsed */}
                  <div className="text-center space-y-0.5">
                    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">Transcurrido</p>
                    <p className="text-6xl sm:text-8xl font-mono font-bold tabular-nums text-zinc-300 leading-none">
                      {fmt(timer.elapsed)}
                    </p>
                  </div>

                  {/* Remaining */}
                  <div className="text-center space-y-0.5">
                    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">Restante</p>
                    <p className={`text-5xl sm:text-7xl font-mono font-bold tabular-nums leading-none ${
                      alertType === 'overtime' ? 'text-red-400 animate-pulse'
                      : alertType === 'warning' ? 'text-yellow-400'
                      : timer.progress < 0.5 ? 'text-emerald-400'
                      : 'text-zinc-100'
                    }`}>
                      {timer.remaining < 0
                        ? fmt(Math.abs(timer.remaining), true)
                        : fmt(timer.remaining)}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="w-full h-5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${barColor(timer.progress, timer.remaining)} ${alertType !== 'none' ? 'animate-pulse' : ''}`}
                        style={{ width: `${Math.min(100, Math.max(2, timer.progress * 100))}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-700 tabular-nums font-mono">
                      <span>{fmtHour(currentEvent.start.dateTime!)}</span>
                      <span className={`font-semibold ${timer.progress > 0.8 ? 'text-red-600' : timer.progress > 0.5 ? 'text-yellow-600' : 'text-zinc-600'}`}>
                        {Math.round(timer.progress * 100)}%
                      </span>
                      <span>{fmtHour(currentEvent.end.dateTime!)}</span>
                    </div>
                  </div>

                  {/* Alert banners */}
                  {alertType === 'overtime' && (
                    <div className="bg-red-900/50 border border-red-700/60 rounded-2xl px-5 py-3 text-center">
                      <p className="text-red-300 font-bold text-sm animate-pulse tracking-wide">
                        ⏰ TIEMPO AGOTADO
                      </p>
                    </div>
                  )}
                  {alertType === 'warning' && (
                    <div className="bg-yellow-900/30 border border-yellow-700/40 rounded-2xl px-5 py-3 text-center">
                      <p className="text-yellow-300 font-semibold text-sm tracking-wide">
                        ⚠️ Quedan 10 minutos
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-3 flex-wrap justify-center">
                {!manualMode ? (
                  <button
                    onClick={startManual}
                    className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 rounded-2xl text-sm font-medium transition-all border border-zinc-700/50"
                  >
                    ▶ Iniciar manual
                  </button>
                ) : (
                  <>
                    <button
                      onClick={togglePause}
                      className={`px-6 py-3 rounded-2xl text-sm font-medium active:scale-95 transition-all border ${
                        isPaused
                          ? 'bg-emerald-900/60 hover:bg-emerald-800/60 text-emerald-300 border-emerald-700/50'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700/50'
                      }`}
                    >
                      {isPaused ? '▶ Continuar' : '⏸ Pausar'}
                    </button>
                    <button
                      onClick={resetAuto}
                      className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-500 rounded-2xl text-sm transition-all border border-zinc-800"
                    >
                      Auto
                    </button>
                  </>
                )}
              </div>

              {/* Next event preview */}
              {nextEvent && nextEvent.start.dateTime && (
                <div className="w-full max-w-sm bg-zinc-900/60 border border-zinc-800/60 rounded-2xl px-4 py-3">
                  <p className="text-zinc-600 text-[10px] uppercase tracking-widest mb-1">Siguiente</p>
                  <p className="text-zinc-300 text-sm font-semibold leading-tight">
                    {splitTitle(nextEvent.summary).client}
                  </p>
                  {splitTitle(nextEvent.summary).procedure && (
                    <p className="text-zinc-500 text-xs">{splitTitle(nextEvent.summary).procedure}</p>
                  )}
                  <p className="text-zinc-600 text-xs tabular-nums font-mono mt-0.5">
                    {fmtHour(nextEvent.start.dateTime)} · en {fmt((new Date(nextEvent.start.dateTime).getTime() - nowMs) / 1000)}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* ── No current event ── */
            <div className="text-center space-y-5 max-w-xs px-4">
              <div className="text-6xl">{nextEvent ? '🕐' : events.length ? '✅' : '📭'}</div>
              {nextEvent && nextEvent.start.dateTime ? (
                <>
                  <div>
                    <p className="text-zinc-600 text-xs uppercase tracking-widest mb-2">Próximo turno</p>
                    <p className="text-3xl font-bold text-zinc-100 leading-tight">
                      {splitTitle(nextEvent.summary).client}
                    </p>
                    {splitTitle(nextEvent.summary).procedure && (
                      <p className="text-zinc-400 text-base mt-1">{splitTitle(nextEvent.summary).procedure}</p>
                    )}
                    <p className="text-zinc-500 text-sm tabular-nums font-mono mt-2">
                      {fmtHour(nextEvent.start.dateTime)} → {nextEvent.end.dateTime ? fmtHour(nextEvent.end.dateTime) : ''}
                    </p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3">
                    <p className="text-zinc-500 text-xs">Empieza en</p>
                    <p className="text-2xl font-mono font-bold text-zinc-300 tabular-nums">
                      {fmt((new Date(nextEvent.start.dateTime).getTime() - nowMs) / 1000)}
                    </p>
                  </div>
                </>
              ) : events.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-zinc-400 font-medium">Sin turnos para hoy</p>
                  <p className="text-zinc-600 text-sm">
                    {selCal?.summary ?? 'Calendario seleccionado'}
                  </p>
                  <button
                    onClick={() => loadEvents(calId)}
                    className="mt-3 text-xs text-zinc-600 hover:text-zinc-400 underline"
                  >
                    Actualizar
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-zinc-400 font-medium">Día terminado</p>
                  <p className="text-zinc-600 text-sm">{events.length} turno{events.length !== 1 ? 's' : ''} completado{events.length !== 1 ? 's' : ''}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Event list ── */}
        <aside className="lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-zinc-800/60 flex flex-col max-h-[45vh] lg:max-h-none overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 flex-shrink-0">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                Turnos del día
              </p>
              <p className="text-zinc-400 text-xs capitalize">
                {now.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <button
              onClick={() => loadEvents(calId)}
              className="text-zinc-700 hover:text-zinc-400 transition-colors text-sm"
              title="Actualizar turnos"
              aria-label="Actualizar turnos"
            >
              ↻
            </button>
          </div>

          <ul className="overflow-y-auto flex-1 divide-y divide-zinc-800/40">
            {events.length === 0 && (
              <li className="px-4 py-6 text-center text-zinc-600 text-sm">Sin turnos</li>
            )}
            {events.map(ev => {
              if (!ev.start.dateTime || !ev.end.dateTime) return null;
              const evStart = new Date(ev.start.dateTime).getTime();
              const evEnd = new Date(ev.end.dateTime).getTime();
              const done = evEnd < nowMs;
              const active = evStart <= nowMs && evEnd > nowMs;
              const { client: evClient, procedure: evProc } = splitTitle(ev.summary);

              return (
                <li
                  key={ev.id}
                  className={`px-4 py-3 flex items-start gap-3 transition-colors ${active ? 'bg-zinc-800/70' : ''}`}
                >
                  <span className={`mt-0.5 text-sm flex-shrink-0 ${done ? 'text-zinc-700' : active ? 'text-emerald-400' : 'text-zinc-700'}`}>
                    {done ? '✓' : active ? '▶' : '◦'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate leading-tight ${
                      done ? 'text-zinc-700 line-through' : active ? 'text-zinc-100' : 'text-zinc-300'
                    }`}>
                      {evClient}
                    </p>
                    {evProc && (
                      <p className={`text-xs truncate ${done ? 'text-zinc-800' : 'text-zinc-600'}`}>{evProc}</p>
                    )}
                    <p className={`text-xs tabular-nums font-mono ${done ? 'text-zinc-800' : 'text-zinc-700'}`}>
                      {fmtHour(ev.start.dateTime)} → {fmtHour(ev.end.dateTime)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}

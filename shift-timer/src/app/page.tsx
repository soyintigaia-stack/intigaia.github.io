import { cookies } from 'next/headers';
import ShiftTimerApp from '@/components/ShiftTimerApp';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const store = await cookies();
  const isAuthenticated = !!store.get('google_access_token')?.value;
  const { error } = await searchParams;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
        <div className="text-center space-y-3">
          <div className="text-5xl mb-2">⏱️</div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Turno Timer</h1>
          <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
            Cronómetro de turnos conectado a Google Calendar. Sabé en tiempo real cuánto lleva y cuánto queda con cada clienta.
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-950/50 border border-red-900/50 px-4 py-2 rounded-lg">
            Error al conectar con Google. Intentá de nuevo.
          </p>
        )}

        <a
          href="/api/auth/login"
          className="flex items-center gap-3 bg-white text-zinc-900 font-semibold px-6 py-3.5 rounded-2xl text-sm hover:bg-zinc-100 active:scale-95 transition-all shadow-lg"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Conectar con Google Calendar
        </a>

        <p className="text-zinc-700 text-xs text-center max-w-xs">
          Solo lectura de calendarios. Ningún evento es modificado.
        </p>
      </main>
    );
  }

  return <ShiftTimerApp />;
}

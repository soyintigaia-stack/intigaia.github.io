import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  title: 'Turno Timer',
  description: 'Cronómetro de turnos para cosmiatra',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Turno Timer' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}

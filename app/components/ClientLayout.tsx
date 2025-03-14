'use client';

import { Inter } from 'next/font/google';
import { AuthProvider } from './AuthProvider';
import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className={`min-h-screen bg-background ${inter.className}`}>
        <Header />
        <main>
          {children}
        </main>
      </div>
    </AuthProvider>
  );
} 
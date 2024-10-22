// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import NetlifyIdentity from '@/components/NetlifyIdentity';

export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your Site Description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head />
      <body>
        {children}
        {/* Include the Netlify Identity client component */}
        <NetlifyIdentity />
      </body>
    </html>
  );
}

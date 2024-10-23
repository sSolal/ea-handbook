// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import NetlifyIdentity from '@/components/NetlifyIdentity';

export const metadata: Metadata = {
  title: 'Le manuel de l\'altruisme efficace',
  description: 'La traduction française du EA handbook',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head />
      <body className="">
        {children}
        {/* Include the Netlify Identity client component */}
        <NetlifyIdentity />
      </body>
    </html>
  );
}

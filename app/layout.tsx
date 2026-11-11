import type { Metadata } from 'next';
import './globals.css';
import ClientLayoutShell from '../components/ClientLayoutShell';

export const metadata: Metadata = {
  title: 'NEXUS AI 2026 - Frontier Models, AGI & UGI Knowledge Platform',
  description:
    'Explore, compare, and contribute deep technical insights on Gemini, Claude, DeepSeek, AGI milestones, UGI multi-modal workflows, and live architecture breakdowns.',
  openGraph: {
    title: 'NEXUS AI 2026 - Frontier Models, AGI & UGI Knowledge Platform',
    description:
      'Explore, compare, and contribute deep technical insights on Gemini, Claude, DeepSeek, AGI milestones, UGI multi-modal workflows, and live architecture breakdowns.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS AI 2026 - Frontier Models, AGI & UGI Knowledge Platform',
    description:
      'Explore, compare, and contribute deep technical insights on Gemini, Claude, DeepSeek, AGI milestones, UGI multi-modal workflows, and live architecture breakdowns.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white min-h-screen dark:bg-slate-950 dark:text-slate-100"
      >
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}

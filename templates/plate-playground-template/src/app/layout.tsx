import { cn } from '@udecode/cn';
import { Toaster } from 'sonner';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/lib/fonts';
import { SiteHeader } from '@/components/site/site-header';
import { TailwindIndicator } from '@/components/site/tailwind-indicator';
import { ThemeProvider } from '@/components/site/theme-provider';

import '@/styles/globals.css';

import { Metadata, Viewport } from 'next';

import { OpenAIProvider } from '@/components/openai/openai-context';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            '[&_.slate-selection-area]:bg-brand/15',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light">
            <OpenAIProvider>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
              </div>
            </OpenAIProvider>

            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

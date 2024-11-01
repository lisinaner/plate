import Balancer from 'react-wrap-balancer';

import { cn } from '@udecode/cn';
import { ChevronRight, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

import { OpenInPlus } from './open-in-plus';
import { DocsPager } from './pager';
import { DashboardTableOfContents } from './toc';
import { badgeVariants } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

import '@/styles/mdx.css';

interface DocPageLayoutProps {
  children: React.ReactNode;
  doc: any; // Replace 'any' with the actual type of your doc
  isUI: boolean;
  toc: any; // Replace 'any' with the actual type of your table of contents
}
const getItemVariant = (item: any) => {
  const allowedHosts = ['pro.platejs.org'];

  try {
    const url = new URL(item.route);

    if (allowedHosts.includes(url.hostname)) return 'plus';
  } catch (error) {
    // console.error('Invalid URL:', item.route, error);
  }

  // if (item.route?.includes('components')) return 'default';
  if (item.route?.includes('components')) return 'secondary';

  return 'outline';
};

export function DocPageLayout({
  children,
  doc,
  isUI,
  toc,
}: DocPageLayoutProps) {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="truncate">{isUI ? 'Components' : 'Docs'}</div>
          <ChevronRight className="size-3.5" />
          <div className="text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn('scroll-m-20 text-xl font-bold tracking-tight')}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-base text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        {doc.links || doc.docs ? (
          <div className="flex flex-wrap items-center gap-1 pt-4">
            {doc.links?.doc && (
              <Link
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
                href={doc.links.doc}
                rel="noreferrer"
                target="_blank"
              >
                Docs
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
                href={doc.links.api}
                rel="noreferrer"
                target="_blank"
              >
                API Reference
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
            {doc.docs?.map((item: any) => (
              <Link
                key={item.route}
                className={cn(
                  badgeVariants({
                    variant: getItemVariant(item),
                  })
                )}
                href={item.route as any}
                rel={item.route?.includes('https') ? 'noreferrer' : undefined}
                target={item.route?.includes('https') ? '_blank' : undefined}
              >
                {item.title}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="pb-12 pt-8">{children}</div>

        <DocsPager doc={doc} />
      </div>

      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="relative">
              <div className="sticky top-16 -mt-10 flex max-h-[calc(75vh-3.5rem)] w-[300px] flex-col py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
            <div className="mt-2">
              <OpenInPlus />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

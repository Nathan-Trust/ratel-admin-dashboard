'use client';
import { ErrorValue, Meta } from '@/models/query';
import { LayoutProps } from '@/models/shared';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryCacheOnError, queryErrorMessage } from '../query';
// import { ThemeProvider } from './theme-provider';
import { Toaster } from 'sonner';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ErrorValue;
    queryMeta: Meta;
  }
}

export default function ProvidersClient({ children }: Readonly<LayoutProps>) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: 'always',
        refetchOnReconnect: 'always',
      },
    },
    queryCache: new QueryCache({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any, query: any) => {
        const message = queryErrorMessage(err);
        queryCacheOnError({ message, query });
      },
    }),
  });

  return (
    <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" />
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
        {children}
        {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
}

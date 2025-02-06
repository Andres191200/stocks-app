'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import Home from './home/page';

const queryClient = new QueryClient();

export default function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}

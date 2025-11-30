import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import '@/app/styles/main.css';
import { RouterProvider } from 'react-router-dom';
import LocationProvider from '@/app/provider/LocationProvider';
import SessionProvider from '@/app/provider/SessionProvider';
import { router } from '@/app/routes/routes';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			refetchOnWindowFocus: false,
			gcTime: 1_000 * 60 * 5, // 5분 캐싱
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<Toaster />
			<SessionProvider>
				<LocationProvider>
					<RouterProvider router={router} />
				</LocationProvider>
			</SessionProvider>
		</QueryClientProvider>
	</StrictMode>
);

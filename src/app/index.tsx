import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import '@/app/styles/main.css';
import { RouterProvider } from 'react-router-dom';
import LocationProvider from '@/app/provider/LocationProvider';
import ModalProvider from '@/app/provider/ModalProvider';
import SessionProvider from '@/app/provider/SessionProvider';
import { router } from '@/app/routes/routes';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1_000 * 60 * 3, // 3분간 상태 유지
			gcTime: 1_000 * 60 * 5, // 5분간 캐시 보관
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<ReactQueryDevtools />
		<Toaster />
		<SessionProvider>
			<LocationProvider>
				<ModalProvider>
					<RouterProvider router={router} />
				</ModalProvider>
			</LocationProvider>
		</SessionProvider>
	</QueryClientProvider>
);

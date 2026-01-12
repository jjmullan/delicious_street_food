import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import '@app/styles/main.css';
import ModalProvider from '@app/provider/ModalProvider';
import SessionProvider from '@app/provider/SessionProvider';
import { router } from '@app/routes/routes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1_000 * 60 * 3, // 3분간 상태 유지
			gcTime: 1_000 * 60 * 5, // 5분간 캐시 보관
			refetchOnWindowFocus: false,
		},
	},
});

if (import.meta.env.DEV) {
	import('@axe-core/react').then((axe) => {
		axe.default(React, ReactDOM, 1000); // 1000ms = 분석 지연 시간
	});
}

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<ReactQueryDevtools />
		<Toaster />
		<SessionProvider>
			<ModalProvider>
				<RouterProvider router={router} />
			</ModalProvider>
		</SessionProvider>
	</QueryClientProvider>
);

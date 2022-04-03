import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { PageLayout } from '@components/layout'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Отключаем перезагрузку данных при переключении вкладок
			refetchOnWindowFocus: false,
		},
	},
})

export const AppProvider: FC = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<PageLayout>{children}</PageLayout>
		</QueryClientProvider>
	)
}

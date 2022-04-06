import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { AppLayout } from '@components/layout'
import { Notifications } from '@components/ui'

import { store } from '@store'

import { HeadProvider } from './HeadProvider'

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
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<AppLayout>{children}</AppLayout>
					<Notifications />
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

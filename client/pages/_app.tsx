import type { AppProps } from 'next/app'

import { AppProvider } from '@components/providers'

import { RolesType } from '@types'

import '../styles/globals.scss'

type AppPropsType = AppProps & { Component: RolesType }

function MyApp({ Component, pageProps }: AppPropsType) {
	return (
		<AppProvider
			roles={{ isAdmin: Component.isAdmin, isUser: Component.isUser }}
		>
			<Component {...pageProps} />
		</AppProvider>
	)
}

export default MyApp

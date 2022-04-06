import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import { FC } from 'react'

import { Favicons } from '@components/ui'

import { colors } from '@utils/constants'

export const HeadProvider: FC = ({ children }) => {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1.0"
				/>

				<Favicons />

				<meta name="theme-color" content={colors.background} />
				<meta
					name="msapplication-navbutton-color"
					content={colors.background}
				/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					color={colors.background}
				/>
			</Head>
			<NextNProgress
				color={colors.primary}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			{children}
		</>
	)
}

import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { clearText } from '@utils/helpers'

export interface IMetaProps {
	title: string
	description?: string
	image?: string
}

export const Meta: FC<IMetaProps> = ({
	title,
	description,
	image,
	children,
}) => {
	const { asPath } = useRouter()
	const currentUrl = `${process.env.APP_URL}${asPath}`

	const siteName = 'Online Cinema'
	const mergedTitle = `${title} | ${siteName}`

	return (
		<>
			<Head>
				<title itemProp="headline">{mergedTitle}</title>
				{description ? (
					<>
						<meta
							itemProp="description"
							name="description"
							content={clearText(description, 152)}
						/>

						<link rel="canonical" href={currentUrl} />

						<meta property="og:locale" content="en" />
						<meta property="og:title" content={mergedTitle} />
						<meta property="og:url" content={currentUrl} />
						<meta
							property="og:image"
							content={image || '/assets/img/ui/logo'}
						/>
						<meta property="og:site_name" content={siteName} />
						<meta
							property="og:description"
							content={clearText(description, 197)}
						/>
					</>
				) : (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Head>

			
			{children}
		</>
	)
}

import { FC } from 'react'
import { useQuery } from 'react-query'

import { GenreService } from '@services'

import { MENU_SECTION } from './Navigation.constants'
import { NavigationAuthSection } from './NavigationAuthSection'
import { INavigationItem } from './NavigationItem'
import { NavigationSection } from './NavigationSection'

import styles from './Navigation.module.scss'

export const NavigationBody: FC = () => {
	const { data, isLoading } = useQuery(
		'genres-section',
		() => GenreService.getAllGenres(),
		{
			select: ({ data }) =>
				data
					.map<INavigationItem>((genre) => ({
						icon: genre.icon,
						link: `/genres/${genre.slug}`,
						title: genre.name,
					}))
					.splice(0, 4),
		},
	)

	return (
		<div className={styles.body}>
			<NavigationSection section={MENU_SECTION} />

			<NavigationSection
				section={{ title: 'Popular genres', items: data || [] }}
				isLoading={isLoading}
			/>

			<NavigationAuthSection />
		</div>
	)
}

import { FC } from 'react'

import { SkeletonLoader } from '@components/ui'

import { INavigationItem, NavigationItem } from './NavigationItem'

import styles from './Navigation.module.scss'

export interface INavigationSection {
	title: string
	items: INavigationItem[]
}

interface INavigationSectionProps {
	section: INavigationSection
	isLoading?: boolean
}

export const NavigationSection: FC<INavigationSectionProps> = ({
	section,
	isLoading,
}) => {
	return (
		<div className={styles.section}>
			<div className={styles.title}>
				{isLoading ? <SkeletonLoader height={25} /> : section.title}
			</div>
			<ul className={styles.list}>
				{isLoading ? (
					<div className="px-layout mb-6">
						<SkeletonLoader count={4} height={25} />
					</div>
				) : (
					section.items.map((item) => (
						<NavigationItem key={item.link} item={item} />
					))
				)}
			</ul>
		</div>
	)
}

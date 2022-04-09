import dynamic from 'next/dynamic'
import { FC } from 'react'

import { SkeletonLoader } from '@components/ui'

import { NavigationGeneral } from '../NavigationGeneral/NavigationGeneral'
import {
	INavigationItem,
	NavigationItem,
} from '../NavigationItem/NavigationItem'

import styles from './NavigationSection.module.scss'

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
				{section.title === 'General' && <NavigationGeneral />}
			</ul>
		</div>
	)
}

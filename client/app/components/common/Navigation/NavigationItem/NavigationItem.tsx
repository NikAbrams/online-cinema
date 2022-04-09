import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { Icon } from '@components/ui'

import { IconsType } from '@types'

import styles from './NavigationItem.module.scss'

export interface INavigationItem {
	icon: IconsType
	title: string
	link?: string
	action?: () => void
}

export const NavigationItem: FC<{ item: INavigationItem }> = ({ item }) => {
	const { title, link, icon, action } = item
	const { asPath } = useRouter()

	return (
		<li
			className={clsx(styles.item, { [styles.active]: asPath === item.link })}
		>
			{link && !action ? (
				<Link href={link}>
					<a className={styles.inner}>
						{/* <Icon name={icon} /> */}
						<span>{title}</span>
					</a>
				</Link>
			) : (
				<div className={styles.inner}>
					{/* <Icon name={icon} /> */}
					<span>{title}</span>
				</div>
			)}
		</li>
	)
}

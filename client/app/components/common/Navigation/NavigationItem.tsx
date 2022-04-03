import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { Icon } from '@components/ui'

import { IconsType } from '@types'

import styles from './Navigation.module.scss'

export interface INavigationItem {
	icon: IconsType
	title: string
	link: string
}

export const NavigationItem: FC<{ item: INavigationItem }> = ({ item }) => {
	const { asPath } = useRouter()

	return (
		<li
			className={clsx(styles.item, { [styles.active]: asPath === item.link })}
		>
			<Link href={item.link}>
				<a>
					<Icon name={item.icon} />
					<span>{item.title}</span>
				</a>
			</Link>
		</li>
	)
}

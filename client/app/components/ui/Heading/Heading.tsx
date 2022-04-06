import clsx from 'clsx'
import { FC } from 'react'

export interface IHeadingProps {
	title: string
	className?: string
}

export const Heading: FC<IHeadingProps> = ({ title, className }) => {
	return (
		<h1
			className={clsx(
				'text-white text-opacity-80 font-semibold',
				{
					['text-3xl']: !className?.includes('xl'),
				},
				className,
			)}
		>
			{title}
		</h1>
	)
}

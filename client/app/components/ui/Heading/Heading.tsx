import { FC } from 'react'

export interface IHeadingProps {
	title: string
	className?: string
}

export const Heading: FC<IHeadingProps> = ({ title, className = '' }) => {
	return (
		<h1
			className={`text-white text-opacity-80 font-semibold ${
				className.includes('xl') ? '' : 'text-3xl'
			} ${className}`}
		>
			{title}
		</h1>
	)
}

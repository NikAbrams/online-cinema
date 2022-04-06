import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

import styles from './SubmitBtn.module.scss'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const SubmitBtn: FC<IButtonProps> = ({
	className,
	children,
	...rest
}) => {
	return (
		<button type="submit" className={clsx(styles.button, className)} {...rest}>
			{children}
		</button>
	)
}

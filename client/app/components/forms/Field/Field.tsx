import clsx from 'clsx'
import { FC, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormMessage } from '../FormMessage/FormMessage'

import styles from './Field.module.scss'

export interface IFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	label?: string
}

export const Field: FC<IFieldProps> = (props) => {
	const { name, type = 'text', label, required, className, ...rest } = props

	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className={clsx(styles.field, className)}>
			{label && (
				<label htmlFor={name}>
					{label}
					{required && <sup>*</sup>}
				</label>
			)}
			<input id={name} type={type} {...register(name)} {...rest} />
			{errors?.[name] && <FormMessage>{errors[name].message}</FormMessage>}
		</div>
	)
}

import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { ClassConstructor } from 'class-transformer'
import clsx from 'clsx'
import { PropsWithChildren, useCallback } from 'react'
import {
	DefaultValues,
	FormProvider,
	SubmitHandler,
	UnpackNestedValue,
	useForm,
} from 'react-hook-form'

import styles from './Form.module.scss'

export interface IFormProps<T> {
	schema: ClassConstructor<T>
	onSubmit: SubmitHandler<T>
	className?: string
	reset?: boolean
	defaultValues?: DefaultValues<T>
}

export const Form = <T,>(props: PropsWithChildren<IFormProps<T>>) => {
	const {
		schema,
		onSubmit,
		className = '',
		reset = true,
		children,
		defaultValues,
	} = props

	const methods = useForm<T>({
		mode: 'onChange',
		resolver: classValidatorResolver(schema),
		defaultValues,
	})

	const submit = useCallback(
		(data: UnpackNestedValue<T>) => {
			onSubmit(data)

			if (reset) methods.reset()
		},
		[onSubmit, methods.reset],
	)

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(submit)}
				className={clsx(styles.form, className)}
				noValidate
			>
				{children}
			</form>
		</FormProvider>
	)
}

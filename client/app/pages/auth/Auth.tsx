import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { Field, Form, SubmitBtn } from '@components/forms'
import { Heading, Meta } from '@components/ui'

import { useAuth, useStoreDispatch } from '@hooks'

import { AuthDto } from './Auth.dto'

import styles from './Auth.module.scss'

export const Auth: FC = () => {
	const { user, isLoading } = useAuth()

	const { query, push } = useRouter()

	const [type, setType] = useState<'login' | 'register'>('login')

	const { login, register } = useStoreDispatch()

	useEffect(() => {
		// const redirect = String(query.redirect) || '/'

		if (user) push('/')
	}, [user, push])

	const handleSubmit = (data: AuthDto) => {
		if (type === 'login') login(data)
		else if (type === 'register') register(data)
	}

	const handleLogin = () => setType('login')
	const handleRegister = () => setType('register')

	return (
		<Meta title="Auth">
			<section className={styles.auth}>
				<Form schema={AuthDto} onSubmit={handleSubmit}>
					<Heading title="Auth" className="mb-6 text-center" />

					<Field name="email" label="E-mail" placeholder="E-mail" required />
					<Field
						name="password"
						type="password"
						label="Password"
						placeholder="Password"
						required
					/>

					<div className={styles.buttons}>
						<SubmitBtn onClick={handleLogin} disabled={isLoading}>
							Login
						</SubmitBtn>
						<SubmitBtn onClick={handleRegister} disabled={isLoading}>
							Register
						</SubmitBtn>
					</div>
				</Form>
			</section>
		</Meta>
	)
}

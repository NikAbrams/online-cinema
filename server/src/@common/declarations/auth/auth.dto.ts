import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail(
		{},
		{
			message: 'Please enter a valid email',
		},
	)
	email: string

	@MinLength(6, {
		message: 'Password must be at least 6 characters!',
	})
	password: string
}

export class RefreshTokenDto {
	@IsString({
		message: 'Token must be a string!',
	})
	refreshToken: string
}

import { IsBoolean, IsEmail, IsOptional, MinLength } from 'class-validator'

export class UserDto {
	@IsEmail(
		{},
		{
			message: 'Please enter a valid email',
		},
	)
	email: string

	@IsOptional()
	@MinLength(6, {
		message: 'Password must be at least 6 characters!',
	})
	password?: string

	@IsOptional()
	@IsBoolean()
	isAdmin?: boolean
}

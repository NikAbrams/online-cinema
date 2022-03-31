/*
	Guard для проверки наличия прав администратора

	Получаем пользователя из запроса (req.user) (для этого мы декодировали токен в jwt стратегии)
*/

import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

// Common
import { UserModel } from '@models'

export class OnlyAdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: UserModel }>()
		const user = request.user

		if (!user.isAdmin)
			throw new ForbiddenException('You are have not admin rights')

		return user.isAdmin
	}
}

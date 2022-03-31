/*
	Декоратор на основе наших Guard'ов для проверки авторизации пользователя.
*/

import { applyDecorators, UseGuards } from '@nestjs/common'

// Common
import { TypeRole } from '@declarations'
import { OnlyAdminGuard, JWTAuthGuard } from '@guards'

const roles: Record<TypeRole, Function[]> = {
	admin: [JWTAuthGuard, OnlyAdminGuard],
	user: [JWTAuthGuard],
}

export const Auth = (role: TypeRole = 'user') =>
	applyDecorators(UseGuards(...roles[role]))

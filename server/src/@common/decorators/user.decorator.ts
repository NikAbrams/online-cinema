/* 
	Декоратор для получения пользователя из запроса (req.user)
*/

import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// Common
import { UserModel } from '@models'

type TypeData = keyof UserModel

export const User = createParamDecorator(
	(data: TypeData, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest()
		const user = request.user
		console.log('Request From User', user)

		return data ? user[data] : user
	},
)

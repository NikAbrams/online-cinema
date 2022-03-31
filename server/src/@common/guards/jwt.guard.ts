/*
  Guard для проверки авторизации. 

  AuthGuard с помощью стратегии авторизации декодирует токен и проверяет его валидность.
*/

import { AuthGuard } from '@nestjs/passport'

export class JWTAuthGuard extends AuthGuard('jwt') {}

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { JwtModule } from '@nestjs/jwt'

// Controllers
import { AuthController } from './auth.controller'

// Services
import { AuthService } from './auth.service'

// Common
import { UserModel } from '@models'
import { getJWTConfig } from '@configs'
import { JWTStrategy } from '@strategies'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	providers: [AuthService, JWTStrategy],
	controllers: [AuthController],
})
export class AuthModule {}

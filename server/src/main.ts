import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors({
		origin: process.env.CLIENT_URL,
	})

	app.setGlobalPrefix('api')
	app.useGlobalPipes(new ValidationPipe())

	await app.listen(4200)
}
bootstrap()

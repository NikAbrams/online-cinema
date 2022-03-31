import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'

// Modules
import { AuthModule } from '@/auth/auth.module'
import { UserModule } from '@/user/user.module'
import { GenreModule } from '@/genre/genre.module'
import { FileModule } from '@/file/file.module'
import { ActorModule } from '@/actor/actor.module'

// Controllers
import { AppController } from './app.controller'

// Services
import { AppService } from './app.service'

// Common
import { getMongoDbConfig } from '@configs'
import { MovieModule } from './movie/movie.module';
import { RatingModule } from './rating/rating.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDbConfig,
		}),
		AuthModule,
		UserModule,
		GenreModule,
		FileModule,
		ActorModule,
		MovieModule,
		RatingModule,
		TelegramModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

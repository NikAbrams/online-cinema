import { TelegramModule } from '@/telegram/telegram.module'
import { MovieModel } from '@models'
import { Module } from '@nestjs/common'

// Modules
import { TypegooseModule } from 'nestjs-typegoose'

// Controllers
import { MovieController } from './movie.controller'

// Services
import { MovieService } from './movie.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: MovieModel,
				schemaOptions: {
					collection: 'Movie',
				},
			},
		]),
		TelegramModule,
	],
	controllers: [MovieController],
	providers: [MovieService],
	exports: [MovieService],
})
export class MovieModule {}

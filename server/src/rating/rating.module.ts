import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

// Modules
import { MovieModule } from '@/movie/movie.module'

// Controllers
import { RatingController } from './rating.controller'

// Services
import { RatingService } from './rating.service'

// Common
import { RatingModel } from '@models'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: RatingModel,
				schemaOptions: {
					collection: 'Rating',
				},
			},
		]),
		MovieModule,
	],
	providers: [RatingService],
	controllers: [RatingController],
	exports: [RatingService],
})
export class RatingModule {}

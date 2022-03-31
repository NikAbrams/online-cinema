import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

// Modules
import { MovieModule } from '@/movie/movie.module'

// Controller
import { GenreController } from './genre.controller'

// Services
import { GenreService } from './genre.service'

// Common
import { GenreModel } from '@models'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: GenreModel,
				schemaOptions: {
					collection: 'Genre',
				},
			},
		]),
		MovieModule,
	],
	controllers: [GenreController],
	providers: [GenreService],
})
export class GenreModule {}

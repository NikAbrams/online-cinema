import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { Types } from 'mongoose'

// Services
import { MovieService } from '@/movie/movie.service'

// Common
import { RatingModel } from '@models'
import { RatingDto } from '@declarations'

@Injectable()
export class RatingService {
	constructor(
		@InjectModel(RatingModel)
		private readonly RatingModel: ModelType<RatingModel>,
		private readonly movieService: MovieService,
	) {}

	async getMovieRatingByUser(movieId: Types.ObjectId, userId: Types.ObjectId) {
		const rating = await this.RatingModel.findOne({
			movieId,
			userId,
		}).select('value')

		return rating ? rating.value : 0
	}

	async getAverageRatingByMovie(movieId: Types.ObjectId) {
		const ratings = await this.RatingModel.aggregate().match({
			movie: new Types.ObjectId(movieId),
		})
		
		return ratings.reduce((acc, item) => acc + item.value, 0) / ratings.length
	}

	async setMovieRating(userId: Types.ObjectId, dto: RatingDto) {
		const { movieId, value } = dto

		const rating = await this.RatingModel.findOneAndUpdate(
			{ user: userId, movie: movieId },
			{ user: userId, movie: movieId, value },
			{ new: true, upsert: true, setDefaultsOnInsert: true }, // нужно для того, чтобы если в бд нет записи, создалась новая
		)

		const averageRating = await this.getAverageRatingByMovie(movieId)

		await this.movieService.updateMovieRating(movieId, averageRating)

		return rating
	}
}

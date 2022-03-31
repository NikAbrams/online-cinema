import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common'
import { Types } from 'mongoose'

// Services
import { RatingService } from './rating.service'

// Common
import { IdValidationPipe } from '@pipes'
import { Auth, User } from '@decorators'
import { RatingDto } from '@declarations'

@Controller('ratings')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@Auth()
	@Get(':movieId')
	async getMovieRatingByUser(
		@User('_id') userId: Types.ObjectId,
		@Param('movieId', IdValidationPipe) movieId: Types.ObjectId,
	) {
		return this.ratingService.getMovieRatingByUser(movieId, userId)
	}

	@Auth()
	@HttpCode(200)
	@Put('set-rating')
	async setMovieRating(
		@User('_id') userId: Types.ObjectId,
		@Body() dto: RatingDto,
	) {
		return this.ratingService.setMovieRating(userId, dto)
	}
}

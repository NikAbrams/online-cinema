import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { Types } from 'mongoose'

// Common
import { MovieDto } from '@declarations'
import { Auth } from '@decorators'
import { IdValidationPipe } from '@pipes'

// Services
import { MovieService } from './movie.service'

@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('by-slug/:slug')
	async getMovieBySlug(@Param('slug') slug: string) {
		return this.movieService.getMovieBySlug(slug)
	}

	@Get('by-actor/:actorId')
	async getMoviesByActor(
		@Param('actorId', IdValidationPipe) actorId: Types.ObjectId,
	) {
		return this.movieService.getMoviesByActor(actorId)
	}

	@HttpCode(200)
	@Post('by-genres')
	async getMoviesByGenres(@Body('genresIds') genresIds: Types.ObjectId[]) {
		return this.movieService.getMoviesByGenres(genresIds)
	}

	@Get('most-popular')
	async getMostPopularMovies() {
		return this.movieService.getMostPopularMovies()
	}

	@HttpCode(200)
	@Put('update-views')
	async updateViewsCount(@Body('slug') slug: string) {
		return this.movieService.updateViewsCount(slug)
	}

	@Get()
	async getMovies(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getMovies(searchTerm)
	}

	@Auth('admin')
	@HttpCode(200)
	@Post()
	async createMovie() {
		return this.movieService.createMovie()
	}

	@Auth('admin')
	@Get(':id')
	async getMovie(@Param('id') id: string) {
		return this.movieService.getMovie(id)
	}

	@Auth('admin')
	@HttpCode(200)
	@Put(':id')
	async updateMovie(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: MovieDto,
	) {
		return this.movieService.updateMovie(id, dto)
	}

	@Auth('admin')
	@Delete(':id')
	async deleteMovie(@Param('id', IdValidationPipe) id: string) {
		return this.movieService.deleteMovie(id)
	}
}

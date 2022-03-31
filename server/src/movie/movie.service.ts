import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { Types } from 'mongoose'

// Common
import { MovieModel } from '@models'
import { MovieDto } from '@declarations'
import { TelegramService } from '@/telegram/telegram.service'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel) private readonly MovieModel: ModelType<MovieModel>,
		private readonly telegramService: TelegramService,
	) {}

	async getMovies(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						title: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.MovieModel.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: 'desc',
			})
			.populate('actors genres')
			.exec()
	}

	async getMovieBySlug(slug: string) {
		const movie = await this.MovieModel.findOne({ slug }).populate(
			'actors genres',
		)

		if (!movie) throw new NotFoundException('Movie not found')

		return movie
	}

	async getMoviesByActor(actorId: Types.ObjectId) {
		const movies = await this.MovieModel.find({ actors: actorId })

		if (!movies) throw new NotFoundException('Movies not found')

		return movies
	}

	async getMoviesByGenres(genresIds: Types.ObjectId[]) {
		const movies = await this.MovieModel.find({ genres: { $in: genresIds } })

		if (!movies?.length) throw new NotFoundException('Movies not found')

		return movies
	}

	async getMostPopularMovies() {
		return this.MovieModel.find({ viewsCount: { $gt: 0 } })
			.sort({ viewsCount: -1 })
			.populate('genres')
			.exec()
	}

	async getMovie(id: string) {
		const movie = await this.MovieModel.findById(id)

		if (!movie) throw new NotFoundException('Movie not found')

		return movie
	}

	async createMovie() {
		const defaultValue: MovieDto = {
			poster: '',
			bigPoster: '',
			title: '',
			slug: '',
			videoUrl: '',
			genres: [],
			actors: [],
		}

		const movie = await this.MovieModel.create(defaultValue)

		return movie._id
	}

	async updateMovie(id: string, dto: MovieDto) {
		if (!dto.isSentTelegram) {
			await this.sendNotification(dto)
			dto.isSentTelegram = true
		}

		const movie = await this.MovieModel.findByIdAndUpdate(id, dto, {
			new: true,
		}).exec()

		if (!movie) throw new NotFoundException('Movie not found')

		return movie
	}

	async deleteMovie(id: string) {
		const movie = await this.MovieModel.findByIdAndDelete(id).exec()

		if (!movie) throw new NotFoundException('Movie not found')

		return movie
	}

	async updateViewsCount(slug: string) {
		const movie = await this.MovieModel.findOneAndUpdate(
			{ slug },
			{
				$inc: { viewsCount: 1 }, // Increment viewsCount by 1
			},
			{ new: true },
		).exec()

		if (!movie) throw new NotFoundException('Movie not found')

		return movie
	}

	async updateMovieRating(id: Types.ObjectId, rating: number) {
		return this.MovieModel.findByIdAndUpdate(
			id,
			{ rating },
			{ new: true },
		).exec()
	}

	async sendNotification(dto: MovieDto) {
		// if (process.env.NODE_ENV !== 'development')
		//	 await this.telegramService.sendPhoto()

		await this.telegramService.sendPhoto(
			'https://i0.wp.com/thinkmonsters.com/speakinghuman/media/wp-content/uploads/John-Wick-Posters-Rule.jpg',
		)

		const message = `<b>${dto.title}</b>`

		await this.telegramService.sendMessage(message, {
			// Кнопка для перехода на страницу фильма
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Watch 🍿',
							url: 'https://rezka.ag/films/action/8174-dzhon-uik-2014.html',
						},
					],
				],
			},
		})
	}
}

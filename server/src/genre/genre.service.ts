import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'

// Services
import { MovieService } from '@/movie/movie.service'

// Common
import { GenreDto, IMovieCollectionByGenre } from '@declarations'
import { GenreModel } from '@models'

@Injectable()
export class GenreService {
	constructor(
		@InjectModel(GenreModel) private readonly GenreModel: ModelType<GenreModel>,
		private readonly movieService: MovieService,
	) {}

	async getGenres(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						name: new RegExp(searchTerm, 'i'),
					},
					{
						slug: new RegExp(searchTerm, 'i'),
					},
					{
						description: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.GenreModel.find(options)
			.select('-updatedAt -__v')
			.sort({
				createdAt: -1,
			})
			.exec()
	}

	// TODO: сейчас в массив collections добавляются коллекции только, если метод getMoviesByGenres не вернет ошибку.
	async getGenresCollections() {
		const genres = await this.getGenres()
		const responses = await Promise.allSettled(
			genres.map(async (genre) => {
				const movies = await this.movieService.getMoviesByGenres([genre._id])

				const collection: IMovieCollectionByGenre = {
					_id: String(genre._id),
					title: genre.name,
					slug: genre.slug,
					image: movies[0].bigPoster,
				}

				return collection
			}),
		)

		const collections = responses.reduce((acc, res) => {
			if (res.status === 'fulfilled') acc.push(res.value)
			return acc
		}, [])

		return collections
	}

	async getGenreBySlug(slug: string) {
		const genre = await this.GenreModel.findOne({ slug })

		if (!genre) throw new NotFoundException('Genre not found')

		return genre
	}

	async getGenre(id: string) {
		const genre = await this.GenreModel.findById(id)

		if (!genre) throw new NotFoundException('Genre not found')

		return genre
	}

	async createGenre() {
		const defaultValue: GenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		}

		const genre = await this.GenreModel.create(defaultValue)

		return genre._id
	}

	async updateGenre(id: string, dto: GenreDto) {
		const genre = await this.GenreModel.findByIdAndUpdate(id, dto, {
			new: true,
		}).exec()

		if (!genre) throw new NotFoundException('Genre not found')

		return genre
	}

	async deleteGenre(id: string) {
		const genre = await this.GenreModel.findByIdAndDelete(id).exec()

		if (!genre) throw new NotFoundException('Genre not found')

		return genre
	}
}

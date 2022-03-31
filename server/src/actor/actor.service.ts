import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'

// Common
import { ActorDto } from '@declarations'
import { ActorModel } from '@models'

@Injectable()
export class ActorService {
	constructor(
		@InjectModel(ActorModel) private readonly ActorModel: ModelType<ActorModel>,
	) {}

	async getActors(searchTerm?: string) {
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
				],
			}
		}

		// Генерируем поле moviesCount для актёра
		return this.ActorModel.aggregate()
			.match(options)
			.lookup({
				// Получаем все фильмы актёра в поле movies
				from: 'Movie', // В какой таблице ищем совпадения
				foreignField: 'actors', // в каком поле ищем совпадения (поле в таблицу Movie)
				localField: '_id', // по какому полю ищем совпадения. (Если Movie.actors массив, то мы будем искать совпадение по _id, если нет то мы будем сравнивать id нашего юзера и поле actors в Movie)
				as: 'movies', // в какое поле помещаем совпадения
			})
			.addFields({
				moviesCount: {
					// добавляем поле moviesCount, в которое помещаем длину массива movies
					$size: '$movies', // size of movies. (знак $ обозначает обращение к полю)
				},
			})
			.project({
				// исключаем лишние поля
				__v: 0,
				updatedAt: 0,
				movies: 0,
			})
			.sort({
				createdAt: -1,
			})
			.exec()
	}

	async getActorBySlug(slug: string) {
		const actor = await this.ActorModel.findOne({ slug })
		console.log(actor)

		if (!actor) throw new NotFoundException('Actor not found')

		return actor
	}

	async getActor(id: string) {
		const actor = await this.ActorModel.findById(id)

		if (!actor) throw new NotFoundException('Actor not found')

		return actor
	}

	async createActor() {
		const defaultValue: ActorDto = {
			name: '',
			slug: '',
			photo: '',
		}

		const actor = await this.ActorModel.create(defaultValue)

		return actor._id
	}

	async updateActor(id: string, dto: ActorDto) {
		const actor = await this.ActorModel.findByIdAndUpdate(id, dto, {
			new: true,
		}).exec()

		if (!actor) throw new NotFoundException('Actor not found')

		return actor
	}

	async deleteActor(id: string) {
		const actor = await this.ActorModel.findByIdAndDelete(id).exec()

		if (!actor) throw new NotFoundException('Actor not found')

		return actor
	}
}

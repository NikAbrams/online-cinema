import { prop, Ref } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { ActorModel } from './actor.model'
import { GenreModel } from './genre.model'

export class ParamsModel {
	@prop()
	year: number

	@prop()
	duration: number

	@prop()
	country: string
}

export interface MovieModel extends Base {}

export class MovieModel extends TimeStamps {
	@prop()
	poster: string

	@prop()
	bigPoster: string

	@prop()
	title: string

	@prop({ unique: true })
	slug: string

	@prop()
	parameters?: ParamsModel

	@prop({ default: 0, min: 0, max: 5 })
	rating: number

	@prop()
	videoUrl: string

	@prop({ default: 0 })
	viewsCount: number

	@prop({ default: [], ref: () => GenreModel })
	genres: Ref<GenreModel>[]

	@prop({ default: [], ref: () => ActorModel })
	actors: Ref<ActorModel>[]

	@prop({ default: false })
	isSentTelegram: boolean
}

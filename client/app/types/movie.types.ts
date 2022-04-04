import { IActor } from './actor.types'
import { IGenre } from './genre.types'

export interface IParameters {
	year: number
	duration: number
	country: string
}

export interface IMovie {
	_id: string
	poster: string
	bigPoster: string
	title: string
	parameters: IParameters
	genres: IGenre[]
	actors: IActor[]
	viewsCount: number
	videoUrl: string
	rating: number
	slug: string
}

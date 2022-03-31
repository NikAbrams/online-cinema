import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsDefined,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	Max,
	Min,
	ValidateNested,
} from 'class-validator'

export class ParametersDto {
	@IsNumber()
	year: number

	@IsNumber()
	duration: number

	@IsString()
	country: string
}

export class MovieDto {
	@IsString()
	poster: string

	@IsString()
	bigPoster: string

	@IsString()
	title: string

	@IsString()
	slug: string

	@IsOptional()
	@IsDefined()
	@IsObject()
	@ValidateNested()
	@Type(() => ParametersDto)
	parameters?: ParametersDto

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(5)
	rating?: number

	@IsString()
	videoUrl: string

	@IsOptional()
	@IsNumber()
	viewsCount?: number

	@IsArray()
	@IsString({ each: true })
	genres: string[]

	@IsArray()
	@IsString({ each: true })
	actors: string[]

	@IsOptional()
	@IsBoolean()
	isSentTelegram?: boolean
}

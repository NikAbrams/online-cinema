import { IsObjectId } from 'class-validator-mongo-object-id'
import { IsNumber, Max, Min } from 'class-validator'
import { Types } from 'mongoose'

export class RatingDto {
	@IsObjectId({ message: 'Object id is not valid' })
	movieId: Types.ObjectId

	@IsNumber()
	@Min(0)
	@Max(5)
	value: number
}

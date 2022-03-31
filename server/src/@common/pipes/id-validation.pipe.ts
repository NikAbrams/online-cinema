import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common'
import { Types } from 'mongoose'

export class IdValidationPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		// Указываем откуда брать value (@Body, @Query, @Param)
		if (metadata.type !== 'param') return value

		// Валидируем значение
		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException('Invalid id')
		}

		return value
	}
}

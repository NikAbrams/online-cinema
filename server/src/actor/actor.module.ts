import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

// Controllers
import { ActorController } from './actor.controller'

// Services
import { ActorService } from './actor.service'

// Common
import { ActorModel } from '@models'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ActorModel,
				schemaOptions: {
					collection: 'Actor',
				},
			},
		]),
	],
	controllers: [ActorController],
	providers: [ActorService],
})
export class ActorModule {}

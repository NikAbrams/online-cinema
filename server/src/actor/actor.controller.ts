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

// Services
import { ActorService } from './actor.service'

// Common
import { ActorDto } from '@declarations'
import { Auth } from '@decorators'
import { IdValidationPipe } from '@pipes'

@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get('by-slug/:slug')
	async getActorBySlug(@Param('slug') slug: string) {
		return this.actorService.getActorBySlug(slug)
	}

	@Get()
	async getActors(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getActors(searchTerm)
	}

	@Auth('admin')
	@HttpCode(200)
	@Post()
	async createActor() {
		return this.actorService.createActor()
	}

	@Auth('admin')
	@Get(':id')
	async getActor(@Param('id') id: string) {
		return this.actorService.getActor(id)
	}

	@Auth('admin')
	@HttpCode(200)
	@Put(':id')
	async updateActor(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ActorDto,
	) {
		return this.actorService.updateActor(id, dto)
	}

	@Auth('admin')
	@Delete(':id')
	async deleteActor(@Param('id', IdValidationPipe) id: string) {
		return this.actorService.deleteActor(id)
	}
}

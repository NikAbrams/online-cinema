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
import { GenreService } from './genre.service'

// Common
import { Auth } from '@decorators'
import { GenreDto } from '@declarations'
import { IdValidationPipe } from '@pipes'

@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	async getGenreBySlug(@Param('slug') slug: string) {
		return this.genreService.getGenreBySlug(slug)
	}

	@Get('collections')
	async getGenresCollections() {
		return this.genreService.getGenresCollections()
	}

	@Get()
	async getGenres(@Query('searchTerm') searchTerm?: string) {
		return this.genreService.getGenres(searchTerm)
	}

	@Auth('admin')
	@HttpCode(200)
	@Post()
	async createGenre() {
		return this.genreService.createGenre()
	}

	@Auth('admin')
	@Get(':id')
	async getGenre(@Param('id') id: string) {
		return this.genreService.getGenre(id)
	}

	@Auth('admin')
	@HttpCode(200)
	@Put(':id')
	async updateGenre(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: GenreDto,
	) {
		return this.genreService.updateGenre(id, dto)
	}

	@Auth('admin')
	@Delete(':id')
	async deleteGenre(@Param('id', IdValidationPipe) id: string) {
		return this.genreService.deleteGenre(id)
	}
}

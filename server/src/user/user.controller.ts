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
import { Types } from 'mongoose'

// Services
import { UserService } from './user.service'

// Common
import { UserDto } from '@declarations'
import { Auth, User } from '@decorators'
import { IdValidationPipe } from '@pipes'
import { UserModel } from '@models'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile')
	async getProfile(@User('_id') id: string) {
		return this.userService.getUserById(id)
	}

	@Auth()
	@HttpCode(200)
	@Put('profile')
	async updateProfile(@User('_id') id: string, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}

	@Auth()
	@HttpCode(200)
	@Put('profile/favorites')
	async toggleFavoriteMovies(
		@User() user: UserModel,
		@Body('movieId', IdValidationPipe) movieId: Types.ObjectId,
	) {
		return this.userService.toggleFavoriteMovies(user, movieId)
	}

	@Auth()
	@Get('profile/favorites')
	async getFavoriteMovies(@User('_id') id: Types.ObjectId) {
		return this.userService.getFavoriteMovies(id)
	}

	@Auth('admin')
	@Get()
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getUsers(searchTerm)
	}

	@Auth('admin')
	@Get('count')
	async getUsersCount() {
		return this.userService.getUsersCount()
	}

	@Auth('admin')
	@Get(':id')
	async getUser(@Param('id', IdValidationPipe) id: string) {
		return this.userService.getUserById(id)
	}

	@Auth('admin')
	@HttpCode(200)
	@Put(':id')
	async updateUser(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: UserDto,
	) {
		return this.userService.updateProfile(id, dto)
	}

	@Auth('admin')
	@HttpCode(200)
	@Delete(':id')
	async deleteUser(@Param('id', IdValidationPipe) id: string) {
		return this.userService.deleteUser(id)
	}
}

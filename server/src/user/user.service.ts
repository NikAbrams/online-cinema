import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { genSalt, hash } from 'bcryptjs'
import { Types } from 'mongoose'

// Common
import { UserDto } from '@declarations'
import { UserModel } from '@models'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
	) {}

	async getUserById(id: string) {
		const user = await this.UserModel.findById(id)
		if (!user) throw new NotFoundException('User not found')

		return user
	}

	async updateProfile(id: string, dto: UserDto) {
		const user = await this.getUserById(id)

		const isEmailBusy = await this.UserModel.findOne({ email: dto.email })
		if (isEmailBusy && String(id) !== String(isEmailBusy._id)) {
			throw new NotFoundException('User with this email already exists')
		}

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email

		// Если не админ - не пропустит
		if (dto?.isAdmin !== undefined && user.isAdmin) {
			user.isAdmin = dto.isAdmin
		}

		await user.save()

		return
	}

	async getUsersCount() {
		return this.UserModel.find().count().exec()
	}

	async getUsers(searchTerm?: string) {
		let options = {}

		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			}
		}

		return this.UserModel.find(options)
			.select('-password -updatedAt -__v')
			.sort({
				createdAt: -1,
			})
			.exec()
	}

	async deleteUser(id: string) {
		return this.UserModel.findByIdAndDelete(id).exec()
	}

	async toggleFavoriteMovies(user: UserModel, movieId: Types.ObjectId) {
		const { _id, favorites } = user

		await this.UserModel.findByIdAndUpdate(_id, {
			favorites: favorites.includes(movieId)
				? favorites.filter((id) => String(id) !== String(movieId))
				: [...favorites, movieId],
		})
	}

	async getFavoriteMovies(userId: Types.ObjectId) {
		const { favorites } = await this.UserModel.findById(userId)
			.select('favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'genres',
				},
			})

		console.log('favorites', favorites)

		return favorites
	}
}

import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { ExtraReplyMessage, ExtraPhoto } from 'telegraf/typings/telegram-types'

// Common
import { getTelegramConfig } from '@configs'
import { ITelegramOptions } from '@declarations'

@Injectable()
export class TelegramService {
	bot: Telegraf
	options: ITelegramOptions

	constructor() {
		this.options = getTelegramConfig()
		this.bot = new Telegraf(this.options.token)
	}

	async sendMessage(message: string, options?: ExtraReplyMessage) {
		await this.bot.telegram.sendMessage(this.options.chatId, message, {
			parse_mode: 'HTML',
			...options,
		})
	}

	async sendPhoto(photo: string, message?: string) {
		const options: ExtraPhoto = message
			? { parse_mode: 'HTML', caption: message }
			: {}

		await this.bot.telegram.sendPhoto(this.options.chatId, photo, options)
	}
}

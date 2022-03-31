// Common
import { ITelegramOptions } from '@declarations'

export const getTelegramConfig = (): ITelegramOptions => ({
	chatId: process.env.TELEGRAM_CHAT_ID,
	token: process.env.TELEGRAM_TOKEN,
})

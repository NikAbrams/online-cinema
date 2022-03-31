import { Module } from '@nestjs/common'

// Services
import { TelegramService } from './telegram.service'

@Module({
	providers: [TelegramService],
	exports: [TelegramService],
})
export class TelegramModule {}

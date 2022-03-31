// Controllers
import { Controller } from '@nestjs/common'

// Services
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}
}

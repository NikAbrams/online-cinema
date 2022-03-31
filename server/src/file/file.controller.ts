import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'

// Services
import { FileService } from './file.service'

// Common
import { Auth } from '@decorators'
import { IFileResponse } from '@declarations'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Auth('admin')
	@HttpCode(200)
	@Post('upload')
	@UseInterceptors(FilesInterceptor('files'))
	async upload(
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder?: string,
	): Promise<IFileResponse[]> {
		return this.fileService.saveFiles(files, folder)
	}
}

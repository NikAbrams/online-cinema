import { Injectable } from '@nestjs/common'
import { ensureDir, writeFile } from 'fs-extra'
import { path } from 'app-root-path'

// Common
import { IFileResponse } from '@declarations'

@Injectable()
export class FileService {
	async saveFiles(
		files: Express.Multer.File[],
		folder: string = 'default',
	): Promise<IFileResponse[]> {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)

		const filesResponse: IFileResponse[] = await Promise.all(
			files.map(async (file) => {
				const filePath = `${uploadFolder}/${file.originalname}`
				await writeFile(filePath, file.buffer)

				return {
					url: `/uploads/${folder}/${file.originalname}`,
					name: file.originalname,
				}
			}),
		)

		return filesResponse
	}
}

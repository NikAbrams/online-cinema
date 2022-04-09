import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const errorHandler = (error: AxiosError) => {
	if (!error?.response?.data) return error.message

	if (typeof error.response.data.message === 'object') {
		return error.response.data.message[0]
	}

	return error.response.data.message
}

export const errorNotification = (error: AxiosError) => {
	const message = errorHandler(error)
	toast.error(message)

	throw message
}

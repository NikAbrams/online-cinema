import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useDebounce } from './useDebounce'

interface UseSearchParams<T> {
	key: string
	query: (searchTerm?: string) => Promise<T>
}

export const useSearch = <T>({ key, query }: UseSearchParams<T>) => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const { data, isSuccess } = useQuery(
		[`search-${key}`, debouncedSearch],
		() => query(debouncedSearch),
		{
			enabled: !!debouncedSearch,
		},
	)

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	return { inputHandler, isSuccess, searchTerm, data }
}

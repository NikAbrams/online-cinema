import { FC, ChangeEvent } from 'react'

import { Icon } from '../Icon/Icon'

import styles from './SearchField.module.scss'

export interface ISearchFieldProps {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SearchField: FC<ISearchFieldProps> = ({
	searchTerm,
	handleSearch,
}) => {
	return (
		<div className={styles.search}>
			<Icon name="MdSearch" />
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onInput={handleSearch}
			/>
		</div>
	)
}

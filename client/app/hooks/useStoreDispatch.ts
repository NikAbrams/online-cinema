// Store
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { StoreDispatchType, actions } from '@store'

export const useStoreDispatch = () => {
	const dispatch = useDispatch<StoreDispatchType>()

	return bindActionCreators(actions, dispatch)
}

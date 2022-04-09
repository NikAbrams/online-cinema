// Store
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { StoreDispatchType, actions } from '@store'

export const useStoreDispatch = () => {
	const dispatch = useDispatch<StoreDispatchType>()

	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}

import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootStateType } from '@store'

export const useStoreSelector: TypedUseSelectorHook<RootStateType> = useSelector

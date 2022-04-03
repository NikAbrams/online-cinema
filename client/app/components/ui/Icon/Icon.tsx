import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { IconsType } from '@types'

interface IIcon {
	name: IconsType
}

export const Icon: FC<IIcon> = ({ name = 'MdDragIndicator' }) => {
	const IconComponent = MaterialIcons[name]

	return <IconComponent />
}

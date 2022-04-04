import React from 'react'

import { Heading, Meta } from '@components/ui'

const Error500 = () => {
	return (
		<Meta title="Page not found">
			<Heading title="500 - Server-side error occurred" />
		</Meta>
	)
}

export default Error500

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const Logo: FC = () => {
	return (
		<Link href="/">
			<a className="px-layout mb-10 block">
				<Image
					src="/assets/img/ui/logo.svg"
					width={247}
					height={34}
					draggable={false}
					alt="Online Cinema"
				/>
			</a>
		</Link>
	)
}

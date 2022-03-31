const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			primary: '#e30b13',
			black: colors.black,
			white: colors.white,
			transparent: colors.transparent,
			yellow: {
				700: '#f5c521',
			},
			gray: {
				300: '#d9dae8',
				500: '#999aa5',
				600: '#66676e',
				700: '#39393f',
				800: '#242529',
				900: '#191b1f',
				950: '#101215',
			},
		},
		extend: {
			spacing: {
				0.5: '0.2rem',
				layout: '4.4rem',
			},
			fontSize: {
				'2lg': '2.2rem',
			},
			borderRadius: {
				image: '0.8rem',
				layout: '1.3rem',
			},
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out',
			},
			transitionDuration: {
				DEFAULT: '0.2s',
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
			},
			keyframes: {
				fadeIn: {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				},
				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)',
					},
					'50%': {
						opacity: 0.3,
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)',
					},
				},
			},
			animation: {
				fadeIn: 'fadeIn 0.5s ease-in-out',
				scaleIn: 'scaleIn 0.35s ease-in-out',
			},
		},
	},
	plugins: [
		plugin(({ theme, addComponents, addUtilities }) => {
			addComponents({
				'.btn-primary': {
					backgroundColor: '#e30b13',
					color: '#fff',
					borderRadius: '1rem',
					transition: 'background-color 0.3s ease-in-out',
					'&:hover': {
						backgroundColor: '#ff0009',
					},
				},
				'.text-link': {
					color: 'rgba(255, 255, 255, 0.9)',
					textUnderlineOffset: 4,
					textDecorationLine: 'underline',
					textDecorationColor: 'rgba(255, 255, 255, 0.2)',
					transition: 'text-decoration-color 0.3s ease-in-out',
					'&:hover': {
						textDecorationColor: 'rgba(255, 255, 255, 0.9)',
					},
				},
				'.air-block': {
					borderRadius: theme('borderRadius.layout'),
					backgroundColor: theme('colors.gray.950'),
					color: theme('colors.white'),
					boxShadow: theme('boxShadow.lg'),
				},
			})
			addUtilities({
				'.text-shadow': {
					textShadow: '1px 1px rgba(0, 0, 0, 0.4)',
				},

				'.outline-border-none': {
					outline: 'none',
					border: 'none',
				},

				'.flex-center-between': {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				},

				'.image-as-bg': {
					objectPosition: 'center',
					objectFit: 'cover',
					pointerEvents: 'none',
				},
			})
		}),
	],
}

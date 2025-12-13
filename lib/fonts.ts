// lib/fonts.ts
import { Playfair_Display } from 'next/font/google'
import { Source_Sans_3 } from 'next/font/google'

export const playfair = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const sourceSans = Source_Sans_3({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
})
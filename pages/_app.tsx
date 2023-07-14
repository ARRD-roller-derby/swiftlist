import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { APP_NAME, SITE_URL } from '@/lib/constants'
import Head from 'next/head'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  const preview = `${SITE_URL}/opengraph-image.png`
  const title = `${APP_NAME}`
  const description =
    "🛒 Swift List est une application de gestion de listes de courses intuitive et pratique. Simplifiez votre expérience de magasinage en créant et en organisant facilement vos listes de courses. L'IA intégrée recherche les rayons correspondants pour chaque produit, ce qui vous permet de trouver rapidement les articles dont vous avez besoin. ✅ Cochez les articles achetés et suivez votre progression en un coup d'œil. Profitez d'une liste de courses efficace et d'une expérience de magasinage sans tracas avec Swift List ! 🚀"
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="twitter:title" content={title} />
        <meta property="og:title" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta
          property="twitter:description"
          content={
            '🛒 Swift List est une application de gestion de listes de courses intuitive et pratique.'
          }
        />
        <meta property="twitter:card" content={description} />

        <meta property="twitter:image" content={preview} />
        <meta property="og:image" content={preview} />

        <meta name="twitter:url" content={SITE_URL} />
        <meta property="og:url" content={SITE_URL} />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

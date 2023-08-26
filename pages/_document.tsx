import { APP_NAME, SITE_URL } from '@/lib/constants'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const preview = `${SITE_URL}/opengraph-image.png`
  const title = `${APP_NAME}`
  const description =
    "🛒 Swift List est une application de gestion de listes de courses intuitive et pratique. Simplifiez votre expérience de magasinage en créant et en organisant facilement vos listes de courses. L'IA intégrée recherche les rayons correspondants pour chaque produit, ce qui vous permet de trouver rapidement les articles dont vous avez besoin. ✅ Cochez les articles achetés et suivez votre progression en un coup d'œil. Profitez d'une liste de courses efficace et d'une expérience de magasinage sans tracas avec Swift List ! 🚀"

  return (
    <Html lang="fr">
      <Head>
        <meta property="twitter:title" content={title} />
        <meta property="og:title" content={title} />
        <link rel="icon" href={`${SITE_URL}/favicon.ico`} />
        <meta name="description" content={description} />
        <meta
          property="twitter:description"
          content={
            '🛒 Swift List est une application de gestion de listes de courses intuitive et pratique.'
          }
        />
        <meta property="og:description" content={description} />
        <meta property="twitter:card" content={description} />

        <meta property="twitter:image" content={preview} />
        <meta property="og:image" content={preview} />

        <meta name="twitter:url" content={SITE_URL} />
        <meta property="og:url" content={SITE_URL} />

        <meta name="application-name" content="Swift list" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Swift list" />
        <meta name="description" content="Best Swift list in the world" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#f2f2f2" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#f2f2f2" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

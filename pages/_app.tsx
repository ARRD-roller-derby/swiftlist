import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

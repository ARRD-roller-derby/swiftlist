import dynamic from 'next/dynamic'

const IndexPage = dynamic(
  () => import('../pages_related/index.page').then((mod) => mod.IndexPage),
  { ssr: false }
)
export default function Home() {
  return <IndexPage />
}

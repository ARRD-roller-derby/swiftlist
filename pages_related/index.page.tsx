import { DelListButton } from '@/components/del-list-button'
import { ItemForm } from '@/components/item-form'
import { Layout } from '@/components/layout'
import { ListItemLine } from '@/components/list-item-line'
import { Sections } from '@/components/sections'
import { useSyncDb } from '@/hooks/sync-db'
import { idb } from '@/lib/idb'
import { useLiveQuery } from 'dexie-react-hooks'

export function IndexPage() {
  const { loading } = useSyncDb()

  return (
    <Layout>
      <div className="sticky top-0 py-1 mb-1 bg-gray-100 border-b-2 border-teal">
        <ItemForm />
      </div>
      {loading && <div className="">Chargement...</div>}
      <Sections />
      <div className="my-5 flex justify-end">
        <DelListButton />
      </div>
    </Layout>
  )
}

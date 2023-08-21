import { Loader } from '@/components'
import { ModeSelector } from '@/components/mode-selector'
import { useSyncDb } from '@/hooks/sync-db'

export function IndexPage() {
  const { loading } = useSyncDb()

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    )
  return <ModeSelector />
}

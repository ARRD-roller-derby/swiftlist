import { Sections, Loader } from '@/components'
import { ItemsWithoutFunction } from '@/components/items-without-section'
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
  return (
    <div className="bg-happy-bg flex justify-center min-h-screen">
      <div className="w-full max-w-md h-screen grid grid-rows-[1fr_auto] p-2">
        <div className="relative h-full">
          <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto p-1">
            <Sections />
            <ItemsWithoutFunction />
          </div>
        </div>

        <ModeSelector />
      </div>
    </div>
  )
}

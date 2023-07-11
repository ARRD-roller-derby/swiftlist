import { useEffect, useState } from 'react'
import { idb } from '@/lib/idb'
import { Section } from '@prisma/client'

/**
 *
 * @description Syncs the local database with the remote database
 */
export function useSyncDb() {
  const [loading, setLoading] = useState(false)

  const syncDb = async () => {
    setLoading(true)

    // Get all the sections and items from the local database
    const localSections = await idb.sections.toArray()
    const localItems = await idb.items.toArray()

    // fetch the sections and items, filtering by the ids of the local sections and items
    const resSections = await fetch('/api/sync/sections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sectionsIds: localSections.map((section) => section.id),
      }),
    })

    const resItems = await fetch('/api/sync/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemsIds: localItems.map((item) => item.id),
      }),
    })
    const dataSections = await resSections.json()
    const dataItems = await resItems.json()

    if (dataSections?.sections) {
      // Add the sections to the local database
      await idb.sections.bulkPut(
        dataSections.sections.filter(
          (section: Section) =>
            !localSections.find(
              (localSection) => localSection.id === section.id
            )
        )
      )
    }

    if (dataItems?.items) {
      // Add the items to the local database
      await idb.items.bulkPut(
        dataItems.items.filter(
          (item: Section) =>
            !localItems.find((localItem) => localItem.id === item.id)
        )
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    syncDb()
  }, [])

  return {
    loading,
    syncDb,
  }
}

import { useEffect, useState } from 'react'
import { idb } from '@/lib/idb'
import { Section } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { convertBase64ToTxt } from '@/lib/convert-txt-to-base64'
import { units } from '@/data'
import { IItemList } from '@/entities'
/**
 *
 * @description Syncs the local database with the remote database
 */
export function useSyncDb() {
  const [loading, setLoading] = useState(false)
  const params = useSearchParams()

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

      // If there is a list in the url, add the items to the local database
      const existingList = params.get('items')

      if (existingList) {
        const convertKey = convertBase64ToTxt(existingList)
        const existingItems = convertKey.split(',').map((id) => {
          const idSplit = id.split('-')

          const unit =
            units.find((unit) => unit.startsWith(idSplit[2])) || units[0]
          return {
            id: parseInt(idSplit[0]),
            quantity: parseInt(idSplit[1]),
            unit,
          }
        })
        await idb.itemsList.clear()
        const items = await idb.items.toArray()

        const itemToPush = existingItems.reduce((acc: IItemList[], item) => {
          const existingItem = items.find((i) => i.id === item.id)
          if (existingItem) {
            return [
              ...acc,
              {
                ...existingItem,
                ...item,
                checked: false,
              },
            ]
          }
          return acc
        }, [])

        await idb.itemsList.bulkPut(itemToPush)
      }
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

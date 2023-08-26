/* eslint-disable react-hooks/exhaustive-deps */
import { idb } from '@/lib/idb'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useMemo, useState } from 'react'
import { ListItemLine } from './list-item-line'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Item } from '@prisma/client'

export function ItemsWithoutFunction() {
  const [loading, setLoading] = useState(false)
  const items = useLiveQuery(async () => await idb.itemsList.toArray())
  const sections = useLiveQuery(async () => await idb.sections.toArray())
  const orphanItems = useMemo(() => {
    if (!items) return []
    return items?.filter((item) => !item.sectionId)
  }, [items])

  const searchSection = async () => {
    if (loading || !sections) return

    const flatSections = sections.reduce((acc, section) => {
      if (section.parentId) {
        const parent = sections.find((s) => s.id === section.parentId)
        if (!parent) return acc
        return (acc += `${parent.name}: ${section.name}\n`)
      }
      return acc
    }, '')

    if (flatSections?.length === 0 || orphanItems.length === 0) return
    setLoading(true)

    const createdItemsRes = await fetch('/api/items/createItems', {
      method: 'POST',
      body: JSON.stringify({
        names: orphanItems.map((item) => item.name),
      }),
    })

    const createdItemsData = await createdItemsRes.json()
    const createdItems: Item[] = createdItemsData?.items || []
    const itemsWithSection = createdItems.filter((item) => !!item.sectionId)
    const itemsWithoutSection = createdItems.filter((item) => !item.sectionId)
    for (const createdItem of itemsWithSection) {
      await idb.items.where({ name: createdItem.name }).modify({
        sectionId: createdItem.sectionId,
      })
    }

    const res = await fetch('/api/ai/search_item', {
      method: 'POST',
      body: JSON.stringify({
        names: itemsWithoutSection.map((item) => item.name),
        sections: flatSections,
      }),
    })

    const data = await res.text()
    if (!data) return setLoading(false)
    const dataTable = data.toLowerCase().split('\n')

    for (const aiRes of dataTable) {
      const searchedItem = orphanItems.find((item) =>
        aiRes.includes(item.name.toLowerCase())
      )
      const section = sections
        .filter((s) => !!s.parentId)
        .find((section) => aiRes.includes(section.name.toLowerCase()))

      if (section && searchedItem) {
        await idb.items.where({ name: searchedItem.name }).modify({
          sectionId: section.id,
        })

        await idb.itemsList.where({ name: searchedItem.name }).modify({
          sectionId: section.id,
          section: section,
        })
        await fetch('/api/items/add_section', {
          method: 'POST',
          body: JSON.stringify({
            id: searchedItem.id,
            sectionId: section.id,
          }),
        })
      }
    }
    setLoading(false)
  }
  useEffect(() => {
    if (orphanItems?.length > 0) searchSection()
  }, [orphanItems])

  if (orphanItems?.length === 0) return <></>
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between py-2 mt-5 text-left font-medium  focus:outline-none">
            <span className="px-2">
              {loading ? "🧠 L'IA recherche les rayons..." : '🤔 À déterminer'}
            </span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-sl-text mr-2`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className=" pt-1 pb-2 text-sm border-sl-tile border-t m-0">
            <div className="flex flex-col gap-1 pl-2">
              <div className="flex flex-col gap-2">
                {orphanItems.map((item) => (
                  <ListItemLine
                    key={`${item.id}-${item.sectionId}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

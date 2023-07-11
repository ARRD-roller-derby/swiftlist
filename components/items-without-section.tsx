/* eslint-disable react-hooks/exhaustive-deps */
import { idb } from '@/lib/idb'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useMemo, useState } from 'react'
import { ListItemLine } from './list-item-line'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export function ItemsWithoutFunction() {
  const [loading, setLoading] = useState(false)
  const items = useLiveQuery(async () => await idb.itemsList.toArray())
  const subSections = useLiveQuery(async () => await idb.sections.toArray())
  const orphanItems = useMemo(() => {
    if (!items) return []
    return items?.filter((item) => !item.sectionId)
  }, [items])

  const searchSection = async () => {
    if (loading || !subSections) return
    const flatSections = subSections
      ?.filter((section) => !!section.parentId)
      .map((section) => section.name)
      .join('\n')

    if (flatSections?.length === 0 || !subSections || orphanItems.length === 0)
      return
    setLoading(true)
    const res = await fetch('/api/ai/search_item', {
      method: 'POST',
      body: JSON.stringify({
        names: orphanItems.map((item) => item.name),
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
      const section = subSections
        .filter((section) => !!section.parentId)
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
          <Disclosure.Button
            className="flex w-full justify-between py-2 mt-5 text-left text-sm font-medium hover:bg-happy-secondary
        hover:text-white focus:outline-none"
          >
            <span>
              {loading
                ? "🧠 L'IA recherche les catégories..."
                : '🤔 À déterminer'}
            </span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-teal-950`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm bg-happy m-0">
            <div className="flex flex-col gap-1 pl-2 text-happy-buttonText-500">
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

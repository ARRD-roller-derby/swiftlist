import { idb } from '@/lib/idb'
import { useLiveQuery } from 'dexie-react-hooks'
import { ListItemLine } from './list-item-line'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useMemo } from 'react'
import { SectionPercent } from './section-percent'

export function Sections() {
  const items = useLiveQuery(async () => await idb.itemsList.toArray())
  const sections = useLiveQuery(async () => await idb.sections.toArray())
  const availableSubSections = useMemo(() => {
    if (!items || !sections) return []
    const subSections = sections?.filter((section) => !!section.parentId)
    return subSections?.filter((subSection) => {
      return !!items?.find((item) => item.sectionId === subSection.id)
    })
  }, [items, sections])

  const availableSections = useMemo(() => {
    if (!items || !sections) return []
    const parentSection = sections?.filter((section) => !section.parentId)
    return parentSection?.filter((section) => {
      return !!availableSubSections?.find(
        (subSection) => subSection.parentId === section.id
      )
    })
  }, [items, sections, availableSubSections])

  return (
    <div className="flex flex-col ">
      {availableSections?.map((section) => (
        <Disclosure key={section.id} defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button
                className="flex w-full justify-between py-2 mt-5 text-left text-sm font-medium hover:bg-teal
              hover:text-white focus:outline-none border-teal border-dotted border-b"
              >
                <span>
                  {section.icon} {section.name}
                  {!open && <SectionPercent sectionId={section.id} />}
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-teal-950`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm bg-gray-200 m-0">
                {availableSubSections
                  ?.filter((subSection) => subSection.parentId === section.id)
                  .map((subSection) => (
                    <div
                      key={subSection.id}
                      className="flex flex-col gap-1 pl-2 text-gray-500 italic"
                    >
                      <div className="flex-1">{subSection.name}</div>
                      <div className="flex flex-col gap-2">
                        {items
                          ?.filter((item) => item.sectionId === subSection.id)
                          .map((item) => (
                            <ListItemLine key={item.id} item={item} />
                          ))}
                      </div>
                    </div>
                  ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}

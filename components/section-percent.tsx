import { idb } from '@/lib/idb'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'

interface SectionPercentProps {
  sectionId: number
}
export function SectionPercent({ sectionId }: SectionPercentProps) {
  const items = useLiveQuery(async () => await idb.itemsList.toArray())
  const subSections = useLiveQuery(
    async () => await idb.sections.where({ parentId: sectionId }).toArray()
  )
  const percent = useMemo(() => {
    if (!items || !subSections) return 0
    const subSectionItems = items?.filter((item) => {
      return !!subSections?.find(
        (subSection) => subSection.id === item.sectionId
      )
    })
    const numberOfCheckedItems = subSectionItems?.filter((item) => item.checked)

    return Math.round(
      (numberOfCheckedItems?.length / subSectionItems?.length) * 100
    )
  }, [items, subSections])

  return <span>{percent === 100 ? '✅' : '🔴'}</span>
}

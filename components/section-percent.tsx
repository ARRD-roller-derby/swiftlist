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
    const subSectionItems = items.filter((item) =>
      subSections.some((subSection) => subSection.id === item.sectionId)
    )
    const numberOfCheckedItems = subSectionItems.filter((item) => item.checked)

    return Math.round(
      (numberOfCheckedItems.length / subSectionItems.length) * 100
    )
  }, [items, subSections])

  const getProgressStep = (percent: number): string => {
    if (percent >= 90) {
      return '🥒🥒🥒🥒🥒' // Haut niveau de progression
    } else if (percent >= 70) {
      return '🥒🥒🥒🥒🍅' // Bon niveau de progression
    } else if (percent >= 50) {
      return '🥒🥒🥒🍅🍅' // Progression moyenne
    } else if (percent >= 30) {
      return '🥒🥒🍅🍅🍅' // Faible progression
    } else if (percent >= 10) {
      return '🥒🍅🍅🍅🍅' // Très faible progression
    } else {
      return '🍅🍅🍅🍅🍅' // Progression minimale
    }
  }

  const progressEmoji = getProgressStep(percent)

  return <span className="px-2">{progressEmoji}</span>
}

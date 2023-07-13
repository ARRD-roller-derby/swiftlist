import { Fragment, useMemo, useState } from 'react'
import { Transition } from '@headlessui/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { idb } from '@/lib/idb'
import levenshtein from 'fast-levenshtein'
import { getRandomArray } from '@/lib/get-random-array'

interface ItemInputProps {
  setQuery: (name: string) => void
  query: string
}

export function ItemInput({ query, setQuery }: ItemInputProps) {
  // IDB ______________________________________________________________________
  const sections = useLiveQuery(async () => await idb.sections.toArray())
  const items = useLiveQuery(async () => await idb.items.toArray())

  // STATE ____________________________________________________________________
  const [selected, _setSelected] = useState('')
  const [loading, setLoading] = useState(false)

  // MEMO _____________________________________________________________________
  const placeholder = useMemo(() => {
    return `${
      items && items.length > 3
        ? getRandomArray(
            items?.map((item) => item.name),
            3
          ).join(', ')
        : 'Coquillettes, Tomates, Jambon'
    }...`
  }, [items])

  const list = useMemo(() => {
    if (!items) return []
    const filteredItems = items
      .map((item) => {
        // on calcule le niveau de similarité entre l'item et la query
        const level = levenshtein.get(item.name, query)
        return {
          ...item,
          level,
        }
      })
      .filter((item) => item.level < 5)
      .sort((a, b) => a.level - b.level)

    return [
      {
        id: '__new__',
        name: `"${query}"`,
      },
      ...filteredItems,
    ].filter((item) => item.name !== 'Créer ""')
  }, [items, query])

  if (!sections || !items) return <div>Chargement...</div>

  const setSelected = async (selectStr: string) => {
    const cleanStr = selectStr.replace(/"/g, '').replace('Créer ', '').trim()
    const isExist = await idb.items.get({ name: cleanStr })
    if (isExist) {
      _setSelected(cleanStr)
      setQuery(cleanStr)
      return
    }
    setLoading(true)
    // correction orthographique
    const correctedNameRes = await fetch('/api/ai/corrector', {
      method: 'POST',
      body: JSON.stringify({ name: cleanStr }),
    })

    const corrected = await correctedNameRes.text()
    const extractWord = corrected.replace(`"${cleanStr}"`, '').match(/"(.*?)"/)
    const correctedWord =
      extractWord && extractWord.length > 0 ? extractWord[1] : cleanStr
    const cleanWord = correctedWord.replace(/corrigé/g, '').toLocaleLowerCase()
    _setSelected(cleanWord)
    setQuery(cleanWord)
    setLoading(false)
  }

  return (
    <div className="relative">
      <Transition
        show={query !== '' && selected !== query}
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute bottom-full mt-2 left-0 w-full bg-happy-stroke text-happy-bg p-3 flex  justify-center gap-5">
          {list.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item.name)}
              className="cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      </Transition>
      <input
        className="rounded-sm w-full border-happy-stroke border pl-2 mt-2 outline-non bg-happy-bg disabled:opacity-50 disabled:cursor-not-allowed"
        value={loading ? `🔎 L'IA traque les fautes d'orthographe..` : query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
      />
    </div>
  )
}

import { Fragment, useMemo, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
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

  // MEMO _____________________________________________________________________
  const placeholder = useMemo(() => {
    return `${getRandomArray(items?.map((item) => item.name) || [], 3).join(
      ', '
    )}...`
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
        name: `Créer "${query}"`,
      },
      ...filteredItems,
    ].filter((item) => item.name !== 'Créer ""')
  }, [items, query])

  if (!sections || !items) return <div>Chargement...</div>

  const setSelected = async (selectStr: string) => {
    const isExist = await idb.items.get({ name: selectStr })
    if (isExist) {
      _setSelected(selectStr)
      setQuery(selectStr)
      return
    }

    const cleanStr = selectStr.replace(/"/g, '').replace('Créer ', '').trim()

    // correction orthographique
    const correctedNameRes = await fetch('/api/ai/corrector', {
      method: 'POST',
      body: JSON.stringify({ name: cleanStr }),
    })

    const corrected = await correctedNameRes.text()
    const extractWord = corrected.replace(`"${selectStr}"`, '').match(/"(.*?)"/)
    const correctedWord =
      extractWord && extractWord.length > 0 ? extractWord[1] : selectStr
    const cleanWord = correctedWord.replace(/corrigé/g, '').toLocaleLowerCase()
    _setSelected(cleanWord)
    setQuery(cleanWord)
  }

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden">
          <Combobox.Input
            className="outline-none focus:ring-0 bg-transparent focus:outline-none w-full p-2  text-sm leading-5 text-gray-900"
            type="text"
            value={query}
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            {list.length > 0 && (
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400 "
                aria-hidden="true"
              />
            )}
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options
            className={
              list.length === 0
                ? 'opacity-0'
                : 'absolute mt-1 max-h-60 w-full overflow-auto  bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border-teal-dark border'
            }
          >
            {list.map((item) => (
              <Combobox.Option
                key={item.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                  }`
                }
                value={item.name}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {item.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-white' : 'text-teal-600'
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

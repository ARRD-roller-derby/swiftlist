import { units } from '@/data/units'
import { ItemInput } from './item-input'
import { UnitSelector } from './unit-selector'
import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { idb } from '@/lib/idb'
import { Item } from '@prisma/client'

const itemInitialState = {
  quantity: 1,
  unit: units[0],
  name: '',
}

export function ItemForm() {
  const [loading, setLoading] = useState(false)
  const subSections = useLiveQuery(async () => await idb.sections.toArray())
  const [item, setItem] = useState(itemInitialState)

  const abortAdd = () => {
    setItem(itemInitialState)
    setLoading(false)
    return true
  }
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!item.name || loading) return

    const searchItem = await idb.items.get({ name: item.name })

    if (searchItem) {
      const findItem = await idb.itemsList.get({
        name: searchItem.name,
      })

      if (findItem) {
        // si se sont des grammes ou des litres, on additionne, sinon on double
        const quantity = findItem.unit.match(/gramme|litre/)
          ? findItem.quantity + item.quantity
          : findItem.quantity * 2

        await idb.itemsList.where({ name: findItem.name }).modify({
          quantity,
        })
      } else {
        await idb.itemsList.add({
          unit: item.unit,
          quantity: item.quantity,
          checked: false,
          ...searchItem,
        })
      }

      setItem(itemInitialState)
      return
    }

    // l'item n'existe pas en local, on le crée _______________________________________________________
    setLoading(true)

    const flatSections = subSections
      ?.filter((section) => !!section.parentId)
      .map((section) => section.name)
      .join('\n')

    if (!flatSections) return abortAdd()

    const res = await fetch('/api/ai/search_item', {
      method: 'POST',
      body: JSON.stringify({ name: item.name, sections: flatSections }),
    })

    const data = await res.text()
    const findSection = subSections?.find((section) =>
      data.includes(section.name)
    )

    if (!findSection) return abortAdd()

    const createdItem = await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify({
        name: item.name,
        sectionId: findSection.id,
      }),
    })

    const createdItemData: { item: Item } = await createdItem.json()

    if (!createdItemData?.item) return abortAdd()

    // on ajoute l'item en local _______________________________________________________
    const itemId = await idb.items.add({
      ...createdItemData.item,
      name: item.name,
    })

    if (!itemId) return abortAdd()
    const localItem = await idb.items.get(itemId)

    if (!localItem) return abortAdd()

    await idb.itemsList.add({
      unit: item.unit,
      quantity: item.quantity,
      checked: false,
      ...localItem,
    })

    setItem(itemInitialState)
    setLoading(false)
  }

  return (
    <form className="flex flex-col gap-1 mb-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-[1fr_2fr] gap-1">
        <div className="cursor-default overflow-hidden border-teal border  text-left focus:outline-none p-0  sm:text-sm">
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              setItem((prev) => ({
                ...prev,
                quantity: parseInt(e.target.value),
              }))
            }
            className="w-full border-none bg-transparent p-2 text-sm leading-5 focus:outline-none"
          />
        </div>
        <UnitSelector
          quantity={item.quantity}
          onChange={(unit) => setItem((prev) => ({ ...prev, unit }))}
        />
      </div>
      <ItemInput
        query={item.name}
        setQuery={(name) => setItem((prev) => ({ ...prev, name }))}
      />
      <div className="flex justify-end">
        <button type="submit" className="bg-teal-dark text-white p-1 uppercase">
          {loading ? '...' : 'Ajouter'}
        </button>
      </div>
    </form>
  )
}

import { IItemList } from '@/entities/item-list'
import { idb } from '@/lib/idb'
import { DelItemButton } from './del-item-button'
import { useState } from 'react'

interface ListItemLineProps {
  item: IItemList
}

export function ListItemLine({ item }: ListItemLineProps) {
  // state pour prévenir le lag de l'idb
  const [check, setCheck] = useState(false)
  const handleStrike = () => {
    setCheck(!check)
    idb.itemsList.where({ id: item.id }).modify({ checked: !item.checked })
  }

  const checked = check ? 'line-through text-gray-500' : ''

  return (
    <div
      className={`flex items-center gap-2 pl-1 pr-1 text-blue-900 cursor-pointer border-b-2 border-b-transparent hover:border-b-teal  hover:border-dotted`}
      onClick={handleStrike}
    >
      <div className={`flex-1 pl-1 text-lg ${checked}`}>
        <span className="text-black">{item.name} </span>
        <span className="">{item.quantity} </span>
        <span className="">
          {item.unit}
          {item.quantity > 1 ? 's' : ''}{' '}
        </span>
      </div>
      <div>
        <DelItemButton id={item.id} />
      </div>
    </div>
  )
}

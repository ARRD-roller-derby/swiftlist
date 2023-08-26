import { IItemList } from '@/entities'
import { idb } from '@/lib/idb'
import { DelItemButton } from '@/components'
import { useState } from 'react'
interface ListItemLineProps {
  item: IItemList
}
export function ListItemLine({ item }: ListItemLineProps) {
  // state pour prévenir le lag de l'idb
  const [check, setCheck] = useState(item.checked)
  const handleStrike = () => {
    setCheck(!check)
    idb.itemsList.where({ id: item.id }).modify({ checked: !item.checked })
  }

  const checked = check ? 'line-through text-gray-500' : ''

  return (
    <div
      className={`flex items-center gap-2 px-1 cursor-pointer border-b border-dotted border-b-sl-line last:border-transparent hover:border-b-teal  hover:border-dotted normal-case`}
      onClick={handleStrike}
    >
      <div className={`flex-1 pl-1 text-lg ${checked} first-letter:uppercase`}>
        {item.name}
        {' - '}
        <span className="text-sl-tile">{item.quantity} </span>
        <span className="text-sl-tile">
          {item.unit}
          {item.quantity > 1 ? 's' : ''}{' '}
        </span>
      </div>
      <div className="mr-2">
        <DelItemButton id={item.id} />
      </div>
    </div>
  )
}

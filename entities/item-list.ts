import { Item } from '@prisma/client'

export interface IItemList extends Item {
  quantity: number
  unit: string
  checked: boolean
}

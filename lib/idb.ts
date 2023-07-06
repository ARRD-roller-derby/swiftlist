import Dexie, { Table } from 'dexie'
import { APP_NAME } from './constants'
import { Item, Section } from '@prisma/client'
import { IItemList } from '@/entities/item-list'

export class IDB extends Dexie {
  // We just tell the typing system this is the case
  sections!: Table<Section>
  items!: Table<Item>
  itemsList!: Table<IItemList>
  params!: Table<{ key: string; value: unknown }>

  constructor() {
    super(APP_NAME)
    this.version(1).stores({
      sections: '++id, name, icon,parentId, subSections',
      items: '++id, name, section',
      itemsList: '++id, name, quantity,section, unit, checked',
      params: '++id, key',
    })
  }
}

export const idb = new IDB()

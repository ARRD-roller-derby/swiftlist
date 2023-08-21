import { Tab } from '@headlessui/react'
import { ItemForm } from './item-form'
import { Infos } from './infos'
import { LegalNotice } from './legal-notice'
import { ShareLink } from './share-link'
import { Welcome } from './welcome'
import { Sections } from './sections'
import { ItemsWithoutFunction } from './items-without-section'
import { useLiveQuery } from 'dexie-react-hooks'
import { idb } from '@/lib/idb'

export function ModeSelector() {
  const tabs = ['➕', '🔄', '🔒', 'ℹ️', '📜']
  const items = useLiveQuery(() => idb.itemsList.count(), [])

  return (
    <div className="h-screen grid grid-rows-[1fr_auto] max-w-[400px] m-auto">
      <Tab.Group>
        <div className="relative h-full ">
          <Tab.Panels className=" absolute top-0 left-0 right-0 bottom-0 overflow-auto">
            <Tab.Panel className="grid grid-rows-[1fr_auto] h-full ">
              <div>
                {items === 0 ? <Welcome /> : <Sections />}
                <ItemsWithoutFunction />
              </div>

              <ItemForm />
            </Tab.Panel>
            <Tab.Panel>
              <ShareLink />
            </Tab.Panel>
            <Tab.Panel className="grid grid-rows-[1fr_auto] h-full">
              <div>
                {items === 0 ? <Welcome /> : <Sections />}
                <ItemsWithoutFunction />
              </div>
              <div>
                <p className="italic text-center">
                  Cliquez sur un article pour le BARRER
                </p>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <Infos />
            </Tab.Panel>
            <Tab.Panel>
              <LegalNotice />
            </Tab.Panel>
          </Tab.Panels>
        </div>
        <Tab.List className="flex gap-3 justify-evenly mt-2">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                ` text-lg uppercase border-t-2 p-2 outline-none bold ${
                  selected ? ' border-sl-margin' : 'border-transparent'
                } rounded-md}`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}

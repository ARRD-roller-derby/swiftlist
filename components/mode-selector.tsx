import { Tab } from '@headlessui/react'
import { ItemForm } from './item-form'
import { Infos } from './infos'
import { LegalNotice } from './legal-notice'
import { ShareLink } from './share-link'

export function ModeSelector() {
  const tabs = ['➕', '🔄', 'ℹ️', '📜']

  return (
    <Tab.Group>
      <Tab.Panels>
        <Tab.Panel>
          <ItemForm />
        </Tab.Panel>
        <Tab.Panel>
          <ShareLink />
        </Tab.Panel>
        <Tab.Panel>
          <Infos />
        </Tab.Panel>
        <Tab.Panel>
          <div className="overflow-y-auto max-h-2Tier p-2">
            <LegalNotice />
          </div>
        </Tab.Panel>
      </Tab.Panels>
      <Tab.List className="flex gap-3 justify-evenly mt-2">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              ` text-lg uppercase border-t-2 p-0 outline-none bold ${
                selected ? ' border-happy-stroke' : 'border-transparent'
              } rounded-md}`
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}

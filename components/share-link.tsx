import { convertTxtToBase64 } from '@/lib/convert-txt-to-base64'
import { idb } from '@/lib/idb'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import va from '@vercel/analytics'

export function ShareLink() {
  const items = useLiveQuery(async () => await idb.itemsList.toArray())
  const link = useMemo(() => {
    if (!items) return
    const itemsList = items.map(
      (item) => `${item.id}-${item.quantity}-${item.unit.slice(0, 2)}`
    )
    return `${window.location.origin}/?items=${convertTxtToBase64(
      itemsList.join(',')
    )}`
  }, [items])

  return (
    <div>
      <div className="text-center italic">
        🔗 Partagez ce lien pour garder votre liste de courses en sécurité et y
        accéder à tout moment. Votre liste est privée et ne sera pas enregistrée
        en ligne.
      </div>
      <input
        onClick={() => va.track('share-link')}
        type="text"
        value={link}
        className="w-full rounded-sm border-happy-stroke border pl-2 mt-2 outline-non bg-happy-bg disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  )
}

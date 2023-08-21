import { convertTxtToBase64 } from '@/lib/convert-txt-to-base64'
import { idb } from '@/lib/idb'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo } from 'react'
import va from '@vercel/analytics'
import dynamic from 'next/dynamic'

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false })

export function ShareLink() {
  const items = useLiveQuery(async () => await idb.itemsList.toArray())
  const link = useMemo(() => {
    if (!items) return ''

    if (items.length === 0) return window.location.origin
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
      <div className="p-6 flex justify-center ">
        <QRCode
          size={150}
          value={link}
          viewBox={`0 0 256 256`}
          bgColor="#F2F2F2"
        />
      </div>
    </div>
  )
}

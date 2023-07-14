import Image from 'next/image'

export function Welcome() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center  w-80px h-80px">
          <Image
            src="/logo.svg"
            alt="Swift List"
            className="text-center"
            width={80}
            height={80}
          />
        </div>

        <h1 className="text-xl text-center">Swift List</h1>
        <p>
          {
            "L'IA intégrée recherche les rayons correspondants pour chaque produit, ce qui vous permet de trouver rapidement les articles dont vous avez besoin. "
          }
        </p>
        <p>
          {
            "✅ Cochez les articles achetés et suivez votre progression en un coup d'œil."
          }
        </p>
        <p>
          {
            "De plus, Swift List vous permet de partager vos listes avec d'autres personnes, idéal pour les courses en famille ou en colocation."
          }
        </p>
        <p>
          {
            ' 🔄 Les listes sont générées dynamiquement et ne sont pas enregistrées en base, garantissant ainsi la confidentialité de vos données.'
          }
        </p>
      </div>
    </div>
  )
}

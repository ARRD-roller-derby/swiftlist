import {
  CONTACT_PAGE_URL,
  HOSTING_ADDRESS,
  HOSTING_COMPANY,
  SITE_EDITOR,
  SITE_EDITOR_NATIONALITY,
  SITE_URL,
} from '@/lib/constants'

export function LegalNotice() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">MENTIONS LÉGALES</h2>
      <p>
        {
          "Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site ger l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi."
        }
      </p>
      <h3 className="font-bold mt-4">Edition du site</h3>
      <p>
        {"Le présent site, accessible à l'URL suivante : "}
        <a
          href={`http://${SITE_URL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline"
        >
          {SITE_URL}
        </a>{' '}
      </p>
      <p> {"L'application"}, est édité par :</p>
      <p>
        {SITE_EDITOR}, de nationalité {SITE_EDITOR_NATIONALITY}.
      </p>
      <h3 className="font-bold mt-4">Hébergement</h3>
      <p>
        Le Site est hébergé par la société {HOSTING_COMPANY}, situé{' '}
        {HOSTING_ADDRESS}.
      </p>
      <h3 className="font-bold mt-4">Nous contacter</h3>
      <p>
        Pour nous contacter, veuillez visiter notre page de contact disponible
        sur{' '}
        <a
          href={CONTACT_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline"
        >
          {CONTACT_PAGE_URL}
        </a>
        .
      </p>
      <h3 className="font-bold mt-4">Données personnelles</h3>
      <p>
        {
          'Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section "Charte de Protection des Données Personnelles", conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).'
        }
      </p>
      <p>
        Génération des mentions légales par{' '}
        <a
          href="https://www.legalstart.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline"
        >
          Legalstart.
        </a>
        .
      </p>
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">
          Charte de Protection des Données Personnelles
        </h2>
        <p className="mb-4">
          La présente Charte de Protection des Données Personnelles (ci-après
          dénommée {'"'}la Charte{'"'}) a pour objectif d{"'"}expliquer comment
          nous respectons la confidentialité de vos données dans le cadre de l
          {"'"}utilisation de notre application, Swift List.
        </p>
        <p className="mb-4">
          Nous tenons à vous assurer que nous ne collectons ni n{"'"}utilisons
          de données personnelles à des fins de suivi ou d{"'"}analyse. Nous
          utilisons uniquement le service Vercel Analytics pour surveiller les
          performances de notre application, sans recueillir de données
          personnelles identifiables.
        </p>
        <p className="mb-4">
          Vous pouvez être tranquille en sachant que votre vie privée est
          importante pour nous. Nous respectons votre droit à la confidentialité
          et prenons toutes les mesures nécessaires pour garantir que vos
          données restent sécurisées et privées.
        </p>
        <p className="mb-4">
          Si vous avez des questions concernant notre Charte de Protection des
          Données Personnelles, veuillez nous contacter à l{"'"}adresse suivante
          :{' '}
          <a
            href={CONTACT_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-500 underline"
          >
            {CONTACT_PAGE_URL}
          </a>
          .
        </p>
        <p>
          Veuillez noter que cette Charte de Protection des Données Personnelles
          peut être mise à jour de temps en temps. Nous vous encourageons donc à
          la consulter régulièrement pour vous tenir informé(e) de tout
          changement.
        </p>
      </div>
    </div>
  )
}

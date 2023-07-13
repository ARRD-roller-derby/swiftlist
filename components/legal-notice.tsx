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
    <div>
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
        (le « Site »), est édité par :
      </p>
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
    </div>
  )
}

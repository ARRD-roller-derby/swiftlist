import va from '@vercel/analytics'
export function Infos() {
  return (
    <div>
      <p className="text-center text-gray-600 mb-4">
        {
          "Bienvenue dans l'appli de liste de courses la plus délicieusement pratique du monde ! 🛒✨"
        }
      </p>
      <p className="text-center text-gray-600 mb-4">
        Ici, tu peux créer ta liste de courses et la gérer comme si tu écrivais
        sur ton bon vieux papier. 📝✏️
      </p>
      <p className="text-center text-gray-600 mb-4">
        Il te suffit de cocher les articles que tu as déjà dans ton panier et
        ils seront rayés, comme par magie ! 🧙‍♂️✨
      </p>
      <p className="text-center text-gray-600 mb-4">
        {
          "Et si tu aimes cette appli et que tu veux me soutenir, tu peux m'offrir un café sur "
        }
        <a
          onClick={() => va.track('kofi')}
          href="https://ko-fi.com/kazerlelutin"
          className="text-happy-button underline font-bold"
        >
          Ko-fi
        </a>
        . ☕️😊
      </p>
    </div>
  )
}

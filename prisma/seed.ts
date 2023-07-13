import { supermarketSections } from '../data/supermarket-sections'
import prisma from '../lib/prisma'
async function main() {
  const response = await Promise.all(
    supermarketSections.map(async (section) => {
      const { name, icon, subSections } = section
      return await prisma.section.upsert({
        where: { name },
        update: {},
        create: {
          name,
          icon,
          subSections: {
            create: subSections.map((subSection) => ({
              name: subSection,
            })),
          },
        },
      })
    })
  )
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

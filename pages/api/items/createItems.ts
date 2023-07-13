import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function createItems(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { names } = JSON.parse(request.body || '{}')

  if (!names) {
    return response.status(400).json({ error: 'Missing name' })
  }

  const items = await Promise.all(
    names.map(async (name: string) => {
      return await prisma.item.upsert({
        where: { name },
        update: {},
        create: {
          name,
        },
      })
    })
  )
  console.log(items)

  return response.json({ items })
}

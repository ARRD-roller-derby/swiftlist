import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function syncItems(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const ids = request.body.itemIds || []
  const items = await prisma.item.findMany({
    where: {
      id: {
        notIn: ids,
      },
    },
  })

  return response.json({ items })
}

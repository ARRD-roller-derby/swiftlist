import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function item_add_section(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id, sectionId } = JSON.parse(request.body || '{}')

  if (!id || !sectionId) {
    return response.status(400).json({ error: 'Missing id or sectionId' })
  }

  await prisma.item.update({
    where: { id },
    data: {
      sectionId,
    },
  })

  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      section: true,
    },
  })

  return response.json({ item })
}

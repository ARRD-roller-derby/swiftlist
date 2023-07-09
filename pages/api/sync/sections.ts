import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function syncSections(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const ids = request.body.sectionsIds || []

  const sections = await prisma.section.findMany({
    where: {
      id: {
        notIn: ids,
      },
    },
  })

  return response.json({ sections })
}

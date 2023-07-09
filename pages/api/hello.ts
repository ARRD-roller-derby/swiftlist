import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function hello(
  _request: NextApiRequest,
  response: NextApiResponse
) {
  return response.json({ hello: 'world' })
}

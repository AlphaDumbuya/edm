import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      await prisma.media.delete({ where: { id: String(id) } });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: 'Failed to delete media' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { id } = req.query;
  const { published } = req.body;
  console.log('API HIT', { id, published });

  if (typeof published !== 'boolean') {
    return res.status(400).json({ error: 'Missing published boolean' });
  }
  try {
    const updated = await prisma.media.update({
      where: { id: String(id) },
      data: { published },
    });
    console.log('Publish update success:', updated);
    return res.status(200).json(updated);
  } catch (err) {
    console.error('Publish update error:', err);
    return res.status(500).json({ error: 'Failed to update publish state', details: err });
  }
}

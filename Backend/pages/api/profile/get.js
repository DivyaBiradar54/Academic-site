import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../../lib/cors';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Enable CORS

  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: User is not logged in.' });
      }

      const profile = await prisma.profile.findFirst({
        where: { userId: parseInt(userId) },
      });

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found.' });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

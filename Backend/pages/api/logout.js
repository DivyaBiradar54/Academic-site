import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../lib/cors'; // Enable CORS

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Enable CORS

  if (req.method === 'POST') {
    try {
      // Optional: Clear session from the database if sessions are used
      const { userId } = req.body;

      res.setHeader('Set-Cookie', 'session=; HttpOnly; Path=/; Max-Age=0');
      return res.status(200).json({ message: 'Logout successful.' });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed.` });
  }
}

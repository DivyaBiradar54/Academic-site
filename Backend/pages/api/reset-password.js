import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../lib/cors'; // CORS middleware

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Enable CORS

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }

      // Find the user by username
      const user = await prisma.user.findFirst({
        where: { name: username },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Update the password in User, Profile, and Registration tables
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { password },
      });

      const updatedProfile = await prisma.profile.updateMany({
        where: { userId: user.id },
        data: { password },
      });

      const updatedRegistration = await prisma.registration.updateMany({
        where: { username },
        data: { password },
      });

      res.status(200).json({
        message: 'Password updated successfully in User, Profile, and Registration tables.',
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

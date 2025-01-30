import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../../lib/cors'; // Import the CORS middleware

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Enable CORS

  if (req.method === 'PUT') {
    const { userId, academicBackground, researchInterests, collegeInfo, email } = req.body;

    try {
      const updatedProfile = await prisma.profile.update({
        where: { userId: parseInt(userId) },
        data: {
          academicBackground,
          researchInterests,
          collegeInfo,
          email,
        },
      });

      res.status(200).json({ message: 'Profile updated successfully!', profile: updatedProfile });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

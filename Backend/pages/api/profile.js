import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../lib/cors'; // CORS middleware

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Enable CORS

  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: 'userId is required in query parameters.' });
      }

      // Fetch user profile by userId
      const profile = await prisma.profile.findFirst({
        where: { userId: parseInt(userId) },
        include: {
          user: {
            select: { name: true }, // Include only the name field from the User table
          },
        },
      });

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found.' });
      }
      // Add the name from the User table to the response
      const response = {
        id: profile.id,
        email: profile.email,
        academicBackground: profile.academicBackground,
        researchInterests: profile.researchInterests,
        collegeInfo: profile.collegeInfo,
        name: profile.user?.name, // Attach the user's name
      
      };
      // Return the profile details
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else if (req.method === 'POST') {
    const { userId, password, email, academicBackground, researchInterests, collegeInfo } = req.body;

    try {
      // Validate input
      if (!userId || !email || !password) {
        return res.status(400).json({ message: 'userId, email, and password are required in the request body.' });
      }
      // Update or create the profile with the plaintext password
      const updatedProfile = await prisma.profile.upsert({
        where: { userId: parseInt(userId) },
        update: { password: password,
          email: email,
          academicBackground: academicBackground || '',
          researchInterests: researchInterests || '',
          collegeInfo: collegeInfo || '', }, // Store the password directly
        create: {
          userId: parseInt(userId),
          password: password,
          email: email,
          academicBackground: academicBackground || '',
          researchInterests: researchInterests || '',
          collegeInfo: collegeInfo || '', // Store the password directly
        },
      });

      res.status(200).json({
        message: 'Profile updated successfully.',
        profile: updatedProfile,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  
  }
}

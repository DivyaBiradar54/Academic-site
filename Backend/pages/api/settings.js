import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../lib/cors'; // CORS middleware

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Enable CORS

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  if (req.method === 'GET') {
    try {
      // Fetch profile settings for the given userId
      const settings = await prisma.profile.findFirst({
        where: { userId: parseInt(userId) },
        select: {
          profilePrivacy: true,
          emailNotifications: true,
          mobilePushNotifications: true,
          academicBackground: true,
          researchInterests: true,
          collegeInfo: true,
          email: true,
        },
        
      });

      if (!settings) {
        return res.status(404).json({ message: 'Profile settings not found for the given userId.' });
      }

      res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching profile settings:', error);
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const {
        profilePrivacy,
        emailNotifications,
        mobilePushNotifications,
        academicBackground,
        researchInterests,
        collegeInfo,
      } = req.body;

      // Update profile settings for the given userId
            const updatedSettings = await prisma.profile.update({
          where: { userId: parseInt(userId) }, // Use userId as the unique field
          data: {
            profilePrivacy,
            emailNotifications,
            mobilePushNotifications,
            academicBackground,
            researchInterests,
            collegeInfo,
          },
        
        
      });

      res.status(200).json({
        message: 'Profile settings updated successfully.',
        updatedSettings,
      });
    } catch (error) {
      console.error('Error updating profile settings:', error);
      res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed.` });
  }
}

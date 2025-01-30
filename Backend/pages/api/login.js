import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../lib/cors'; // Enable CORS

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Enable CORS
  await corsMiddleware(req, res);

  // Handle POST requests
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Check if the user exists by username or email
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ name: username }, { email: username }],
        },
      });

      // If user not found
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Validate the password directly
      if (password !== user.password) {
        return res
          .status(401)
          .json({ message: 'Invalid password. Please try again.' });
      }

      // If successful, return user details
      return res.status(200).json({
        userId: user.id,
        username: user.name,
        email: user.email,
        message: 'Login successful.',
      });
    } catch (error) {
      console.error('Error in Login API:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed.` });
  }
}

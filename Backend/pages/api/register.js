import { PrismaClient } from '@prisma/client';
import corsMiddleware from '../../lib/cors'; // Import the CORS utility

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Enable CORS
  await corsMiddleware(req, res);

  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'This is the register API. Use POST to register a new user.',
    });
  }

  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      // Check for missing fields
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Check if username or email exists
      const existingUser = await prisma.registration.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists.' });
      }

      // Create new registration without hashing the password
      const newRegistration = await prisma.registration.create({
        data: {
          username,
          email,
          password, // Store the plaintext password directly
        },
      });
      const newUser = await prisma.user.create({
        data: {
          name: username,
          email: email,
          password: password, // Match column name in your `User` table
          userType: 'basic', // Set a default userType or adjust based on your schema
        },
      });
      const newProfile = await prisma.profile.create({
        data: {
          userId: newUser.id, // Link with the newly created User record
          email: email,
          password: password, // Match column name in your `Profile` table
          academicBackground: '', // Set default values or leave fields empty
          researchInterests: '',
          collegeInfo: '',
        },
      });
      res.status(201).json({ message: 'Registration successful!', user: newUser });
    } catch (error) {
      console.error('Error in /api/register:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

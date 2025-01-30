import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;

      if (id) {
        // Fetch a specific user by ID with email and name
        const user = await prisma.user.findUnique({
          where: { id: parseInt(id) },
          select: { email: true, name: true }, // Fetch only email and name
        });

        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json(user);
      }

      // Fetch all users along with their profiles and related data
      const users = await prisma.user.findMany({
        include: {
          Profiles: true,
          Events: true,
          Jobs: true,
        },
      });
      return res.status(200).json(users);
    } else if (req.method === "POST") {
      // Create a new user
      const {
        userType,
        name,
        email,
        passwordHash, // Assuming this is hashed already
      } = req.body;

      if (!userType || !name || !email || !passwordHash) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newUser = await prisma.user.create({
        data: {
          userType,
          name,
          email,
          password: passwordHash, // Ensure it's correctly hashed
        },
      });

      return res.status(201).json(newUser);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in users API:", error);
    return res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}

import { PrismaClient } from "@prisma/client";
import corsMiddleware from "../../lib/cors"; // Enable CORS middleware

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Enable CORS

  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Save the mentorship form data in the Mentorship_Form table
      const mentorshipForm = await prisma.mentorshipForm.create({
        data: {
          name,
          email,
          message,
          createdBy: 1, // Replace with the logged-in user's ID
        },
      });

      res.status(201).json({
        message: "Mentorship form submitted successfully!",
        mentorshipForm,
      });
    } catch (error) {
      console.error("Error saving mentorship form:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}

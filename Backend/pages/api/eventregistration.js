import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { name, email, phoneNumber, eventId } = req.body;
    console.log(name, email, phoneNumber, eventId );
    if (!name || !email || !phoneNumber || !eventId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Create a new event registration entry in the database
      const registration = await prisma.eventRegistration.create({
        data: {
          name,
          email,
          phoneNumber,
          eventAttending: parseInt(eventId),
        },
      });

      res.status(201).json({ message: "Registration successful!", registration });
    } catch (error) {
      console.error("Error saving registration:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}

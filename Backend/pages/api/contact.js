import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      const newMessage = await prisma.contactMessage.create({
        data: { email, subject, message },
      });

      return res.status(201).json({ message: "Message sent successfully!", newMessage });
    } catch (error) {
      console.error("Error saving contact message:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}

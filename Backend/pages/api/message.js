import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { emailFrom, emailTo } = req.query;

      if (!emailFrom || !emailTo) {
        return res.status(400).json({ message: "Both emailFrom and emailTo are required." });
      }

      // Fetch messages between emailFrom and emailTo (bidirectional)
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { emailFrom, emailTo },
            { emailFrom: emailTo, emailTo: emailFrom },
          ],
        },
        orderBy: { createdAt: "asc" },
      });

      return res.status(200).json(messages);
    } else if (req.method === "POST") {
      const { emailFrom, emailTo, message, Name } = req.body;

      if (!emailFrom || !emailTo || !message || !Name) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Create a new message
      const newMessage = await prisma.message.create({
        data: { emailFrom, emailTo, message, Name },
      });

      return res.status(201).json({ message: "Message sent successfully!", newMessage });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ message: `Method ${req.method} not allowed.` });
    }
  } catch (error) {
    console.error("Error in /api/message:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const events = await prisma.event.findMany();
      const groupedEvents = events.reduce((acc, event) => {
        const eventMonth = new Date(event.eventDate).toLocaleString("en-US", {
          month: "long",
        });
        if (!acc[eventMonth]) {
          acc[eventMonth] = [];
        }
        acc[eventMonth].push(event);
        return acc;
      }, {});

      res.status(200).json(groupedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

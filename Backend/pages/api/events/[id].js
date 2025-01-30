import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Fetch event data by ID, including the organizer's name
      const event = await prisma.event.findUnique({
        where: { id: parseInt(id) },
        include: {
          organizer: {
            select: {
              name: true, // Include only the organizer's name
            },
          },
        },
      });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      // Structure the response to include organizer's name
      res.status(200).json({
        id: event.id,
        name: event.name,
        description: event.description,
        eventDate: event.eventDate,
        location: event.location,
        participationType: event.participationType,
        organizerName: event.organizer.name, // Use organizer's name
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

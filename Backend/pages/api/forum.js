import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id, topicId } = req.query; // Extract ID and topicId from the query parameters

  if (req.method === 'GET') {
    try {
      if (id) {
        // Fetch a specific topic by ID
        const topic = await prisma.topic.findUnique({
          where: { id: parseInt(id) },
        });

        if (!topic) {
          return res.status(404).json({ message: 'Topic not found.' });
        }

        res.status(200).json(topic);
      } else if (topicId) {
        // Fetch a specific topic by topicId
        const topic = await prisma.topic.findUnique({
          where: { id: parseInt(topicId) },
        });

        if (!topic) {
          return res.status(404).json({ message: 'Topic not found.' });
        }

        res.status(200).json(topic);
      } else {
        // Fetch all topics
        const topics = await prisma.topic.findMany();
        res.status(200).json(topics);
      }
    } catch (error) {
      console.error('Error fetching topic(s):', error);
      res.status(500).json({ message: 'Error fetching topic(s).' });
    }
  } else if (req.method === 'POST') {
    const { author, category, title, content } = req.body;

    if (!author || !category || !title || !content) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const newTopic = await prisma.topic.create({
        data: { author, category, title, content },
      });
      res.status(201).json(newTopic);
    } catch (error) {
      console.error('Error creating topic:', error);
      res.status(500).json({ message: 'Error creating topic.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}

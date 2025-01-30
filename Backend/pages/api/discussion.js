import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  let { topicId, commentId } = req.query;

  if (!topicId) {
    topicId = req.body.topicId;
  }

  //console.log('Request Body:', req.body);

  if (req.method === 'GET') {
    // Fetch comments for a specific topic
    try {
      if (!topicId) {
        return res.status(400).json({ message: 'topicId is required.' });
      }

      const comments = await prisma.comment.findMany({
        where: { topicId: parseInt(topicId) },
        orderBy: { timestamp: 'desc' },
      });

      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Error fetching comments.' });
    }
  } else if (req.method === 'POST') {
    const { author, text } = req.body;
    if (!commentId){commentId = req.body.commentId;}
    if (commentId) {
      // Update likes for a specific comment
      try {
        //console.log('Received Comment ID for Like:', commentId);

        const updatedComment = await prisma.comment.update({
          where: { id: parseInt(commentId) }, // Find the comment by ID
          data: { likes: { increment: 1 } },  // Increment the likes field
        });

        return res.status(200).json(updatedComment);
      } catch (error) {
        console.error('Error liking the comment:', error);
        return res.status(500).json({ message: 'Error liking the comment.' });
      }
    }

    // Create a new comment if `commentId` is not provided
    if (!author || !text || !topicId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const newComment = await prisma.comment.create({
        data: { topicId: parseInt(topicId), author, text },
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ message: 'Error creating comment.' });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}

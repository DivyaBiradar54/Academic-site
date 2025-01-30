// // import { PrismaClient } from "@prisma/client";
// // import corsMiddleware from "../../lib/cors"; // CORS middleware

// // const prisma = new PrismaClient();

// // export default async function handler(req, res) {
// //   await corsMiddleware(req, res); // Enable CORS

// //   if (req.method === "GET") {
// //     try {
// //       // Fetch all group chat messages
// //       const messages = await prisma.groupChat.findMany({
// //         orderBy: { createdAt: "desc" },
// //       });
// //       res.status(200).json(messages);
// //     } catch (error) {
// //       console.error("Error fetching group chat messages:", error);
// //       res.status(500).json({ message: "Internal server error." });
// //     }
// //   } else if (req.method === "POST") {
// //     const { userInitials, message, reactions, messageDate, messageTime } = req.body;

// //     // Validate required fields
// //     if (!userInitials || !message) {
// //       return res
// //         .status(400)
// //         .json({ message: "User initials and message are required." });
// //     }

// //     try {
// //       // Create a new group chat message
// //       const newMessage = await prisma.groupChat.create({
// //         data: {
// //           userInitials,
// //           message,
// //           reactions: reactions ? JSON.stringify(reactions) : null, // Save as JSON
// //           messageDate: new Date(messageDate),
// //           messageTime: new Date(messageTime),
// //         },
// //       });

// //       res.status(201).json(newMessage);
// //     } catch (error) {
// //       console.error("Error saving group chat message:", error);
// //       res.status(500).json({ message: "Internal server error." });
// //     }
// //   } else if (req.method === "PATCH") {
// //     const { id, reactions, replies } = req.body;

// //     // Validate input
// //     if (!id || (!reactions && !replies)) {
// //       return res.status(400).json({
// //         message:
// //           "Message ID and at least one field (reactions or replies) are required.",
// //       });
// //     }

// //     try {
// //       // Update reactions and/or replies for a specific message
// //       const updatedMessage = await prisma.groupChat.update({
// //         where: { id },
// //         data: {
// //           reactions: reactions ? JSON.stringify(reactions) : undefined,
// //           replies: replies ? { push: replies } : undefined, // For array field handling
// //         },
// //       });

// //       res.status(200).json(updatedMessage);
// //     } catch (error) {
// //       console.error("Error updating reactions or replies:", error);
// //       res.status(500).json({ message: "Internal server error." });
// //     }
// //   } else {
// //     // Handle unsupported methods
// //     res.setHeader("Allow", ["GET", "POST", "PATCH"]);
// //     res
// //       .status(405)
// //       .json({ message: `Method ${req.method} not allowed.` });
// //   }
// // }


// import { PrismaClient } from "@prisma/client";
// import corsMiddleware from "../../lib/cors"; // CORS middleware

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   await corsMiddleware(req, res); // Enable CORS

//   if (req.method === "GET") {
//     try {
//       // Fetch all group chat messages
//       const messages = await prisma.groupChat.findMany({
//         orderBy: { createdAt: "desc" },
//       });
//       res.status(200).json(messages);
//     } catch (error) {
//       console.error("Error fetching group chat messages:", error);
//       res.status(500).json({ message: "Internal server error." });
//     }
//   } else if (req.method === "POST") {
//     const { userInitials, message, reactions, messageDate, messageTime, replyToId, reply } = req.body;

//     // Check if it's a reply to an existing message
//     if (replyToId) {
//       // Validate required fields for reply
//       if (!reply || typeof reply !== "string") {
//         return res.status(400).json({ message: "Reply content is required." });
//       }

//       try {
//         // Add a reply to an existing message
//         const updatedMessage = await prisma.groupChat.update({
//           where: { id: replyToId },
//           data: {
//             replies: { push: reply }, // Append the new reply
//           },
//         });

//         return res.status(200).json(updatedMessage);
//       } catch (error) {
//         console.error("Error adding reply:", error);
//         return res.status(500).json({ message: "Internal server error." });
//       }
//     } else {
//       // Validate required fields for a new message
//       if (!userInitials || !message) {
//         return res
//           .status(400)
//           .json({ message: "User initials and message are required." });
//       }

//       try {
//         // Create a new group chat message
//         const newMessage = await prisma.groupChat.create({
//           data: {
//             userInitials,
//             message,
//             reactions: reactions ? JSON.stringify(reactions) : null, // Save as JSON
//             messageDate: new Date(messageDate),
//             messageTime: new Date(messageTime),
//             replies: [], // Initialize with empty replies
//           },
//         });

//         res.status(201).json(newMessage);
//       } catch (error) {
//         console.error("Error saving group chat message:", error);
//         res.status(500).json({ message: "Internal server error." });
//       }
//     }
//   } else if (req.method === "PATCH") {
//     const { id, reactions, reply } = req.body;

//     // Validate input
//     if (!id || (!reactions && !reply)) {
//       return res.status(400).json({
//         message: "Message ID and at least one field (reactions or reply) are required.",
//       });
//     }

//     try {
//       // Update reactions or replies for a specific message
//       const updatedMessage = await prisma.groupChat.update({
//         where: { id },
//         data: {
//           reactions: reactions ? JSON.stringify(reactions) : undefined,
//           replies: reply ? { push: reply } : undefined, // Append the new reply
//         },
//       });

//       res.status(200).json(updatedMessage);
//     } catch (error) {
//       console.error("Error updating reactions or replies:", error);
//       res.status(500).json({ message: "Internal server error." });
//     }
//   } else {
//     // Handle unsupported methods
//     res.setHeader("Allow", ["GET", "POST", "PATCH"]);
//     res.status(405).json({ message: `Method ${req.method} not allowed.` });
//   }
// }


import { PrismaClient } from "@prisma/client";
import corsMiddleware from "../../lib/cors"; // CORS middleware

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Enable CORS

  if (req.method === "GET") {
    try {
      // Fetch all group chat messages along with replies
      const messages = await prisma.groupChat.findMany({
        orderBy: { createdAt: "desc" }, // Sorting by creation date
        include: {
          replies: true, // Include the replies in the response
        },
      });
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching group chat messages:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else if (req.method === "POST") {
    const { userInitials, message, reactions, messageDate, messageTime } = req.body;

    // Validate required fields
    if (!userInitials || !message) {
      return res
        .status(400)
        .json({ message: "User initials and message are required." });
    }

    try {
      // Create a new group chat message
      const newMessage = await prisma.groupChat.create({
        data: {
          userInitials,
          message,
          reactions: reactions ? reactions : {}, // Default to empty JSON object if no reactions
          messageDate: new Date(messageDate),
          messageTime: new Date(messageTime),
          // No need to initialize replies here anymore as replies are stored in a separate table
        },
      });

      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error saving group chat message:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else if (req.method === "PATCH") {
    const { id, reactions, reply } = req.body;

    // Validate input
    if (!id || (!reactions && !reply)) {
      return res.status(400).json({
        message: "Message ID and at least one field (reactions or reply) are required.",
      });
    }

    try {
      // Find the message to update
      const message = await prisma.groupChat.findUnique({ where: { id } });

      if (!message) {
        return res.status(404).json({ message: "Message not found." });
      }

      // Update reactions
      const updatedMessage = await prisma.groupChat.update({
        where: { id },
        data: {
          reactions: reactions ? reactions : undefined,
        },
      });

      // If a reply is provided, create a new reply in the `Reply` table
      if (reply) {
        const newReply = await prisma.reply.create({
          data: {
            groupChatId: id, // Link the reply to the group chat message by ID
            author: reply.author,
            text: reply.text,
            timestamp: new Date(), // Use the current timestamp for the reply
          },
        });

        // Return the updated message and the newly created reply
        return res.status(200).json({
          updatedMessage,
          newReply,
        });
      }

      res.status(200).json(updatedMessage); // If no reply, just return the updated message
    } catch (error) {
      console.error("Error updating reactions or adding reply:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "POST", "PATCH"]);
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
}

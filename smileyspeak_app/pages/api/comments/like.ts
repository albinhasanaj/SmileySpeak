import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "@/lib/connectToDB";
import { getUserIdFromJWT } from "@/lib/getUserIdFromJWT";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        // Handle non-POST requests if necessary or return a method not allowed error.
        return res.status(405).json({ message: "Method not allowed" });
    }

    // Extract the user ID from the JWT.
    const user_id = getUserIdFromJWT(req, res);
    if (!user_id) {
        // Handle unauthorized access if user_id is not found.
        return res.status(401).json({ message: "Not authenticated" });
    }

    const { card_id } = req.body;
    let message = ""; // Variable to store the response message

    let connection;
    try {
        connection = await getConnection();
        const checkLikeStatusQuery = `
            SELECT liked FROM Likes WHERE user_id = ? AND card_id = ?;
        `;
        const [likeStatus]: any = await connection.query(checkLikeStatusQuery, [user_id, card_id]);

        if (likeStatus.length === 0) {
            const insertLikeQuery = `
                INSERT INTO Likes (user_id, card_id, liked) VALUES (?, ?, TRUE);
            `;
            await connection.query(insertLikeQuery, [user_id, card_id]);
            message = "Liked"; // Set message for new like
        } else {
            // Toggle the like status if the record exists.
            const currentLikedStatus = likeStatus[0].liked;
            const toggleLikeQuery = `
                UPDATE Likes SET liked = NOT liked WHERE user_id = ? AND card_id = ?;
            `;
            await connection.query(toggleLikeQuery, [user_id, card_id]);
            message = currentLikedStatus ? "Unliked" : "Liked"; // Determine the message based on previous status
        }

        // Update the like_count in the Cards table.
        const updateLikeCountQuery = `
            UPDATE Cards SET like_count = (
                SELECT COUNT(*) FROM Likes WHERE card_id = ? AND liked = TRUE
            ) WHERE card_id = ?;
        `;
        await connection.query(updateLikeCountQuery, [card_id, card_id]);

        // Retrieve the updated like_count to send it back in the response.
        const [updatedLikeCountResult]: any = await connection.query(
            'SELECT like_count FROM Cards WHERE card_id = ?', [card_id]
        );
        const updatedLikeCount = updatedLikeCountResult[0]?.like_count || 0;

        res.status(200).json({
            message: message,
            likeCount: updatedLikeCount
        });

    } catch (error) {
        console.error("Failed to process like", error);
        res.status(500).json({ message: "Failed to process like" });
    } finally {
        if (connection) connection.release();
    }
}

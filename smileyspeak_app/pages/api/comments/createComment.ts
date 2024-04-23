import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "@/lib/connectToDB";
import { getUserIdFromJWT } from "@/lib/getUserIdFromJWT";
import { randomUUID } from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        let connection;
        try {
            connection = await getConnection();
            const { comment, tags } = req.body;
            if (!comment || !tags) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            };

            // get the user id
            const userID = getUserIdFromJWT(req, res);
            if (!userID) {
                return res.status(401).json({ message: 'Not authenticated' });
            }

            //Create a card ID
            const cardID = randomUUID();

            const sqlQuery = `INSERT INTO Cards (card_id, user_id, content, hashtag1, hashtag2, hashtag3)
            VALUES (?, ?, ?, ?, ?, ?)`

            const convertedHashtags = tags.replace(" ", "").split(","); // hashtags are separated by commas like "tag1,tag2,  tag3"
            const hashtags = ["", "", ""];
            convertedHashtags.forEach((tag: string, index: number) => {
                hashtags[index] = tag;
            });

            await connection.query(sqlQuery, [cardID, userID, comment, ...hashtags]);
            connection.release();

            return res.status(200).json({ message: 'Comment created' });

        } catch (error: any) {
            console.error("Failed to create comment", error);
            res.status(500).json({ message: error.message });
        } finally {
            if (connection) {
                connection.release();
            };
        };
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
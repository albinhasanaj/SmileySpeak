import { getConnection } from "@/lib/connectToDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search } = req.query;  // Retrieve the search query parameter

    if (req.method == "GET") {
        let connection;
        try {
            connection = await getConnection();
            let sqlQuery = `
                SELECT Cards.card_id, Users.username, Users.profilePicture, Users.email, Cards.content, 
                       Cards.like_count, Cards.hashtag1, Cards.hashtag2, Cards.hashtag3
                FROM Cards 
                JOIN Users ON Cards.user_id = Users.id
            `;

            // If a search term is provided, add a WHERE clause to filter results
            if (search !== undefined && search !== "") {
                sqlQuery += `
                    WHERE Users.username LIKE CONCAT('%', ?, '%') 
                    OR Cards.hashtag1 LIKE CONCAT('%', ?, '%') 
                    OR Cards.hashtag2 LIKE CONCAT('%', ?, '%') 
                    OR Cards.hashtag3 LIKE CONCAT('%', ?, '%')
                `;
                const [rows] = await connection.query(sqlQuery, [search, search, search, search]);
                res.status(200).json(rows);
            } else {
                const [rows] = await connection.query(sqlQuery);
                res.status(200).json(rows);
            }

        } catch (error) {
            console.error("Failed to get cards", error);
            res.status(500).json({ message: "Failed to get cards" });
        } finally {
            if (connection) {
                connection.release();
            }
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "@/lib/connectToDB";
import { getUserIdFromJWT } from "@/lib/getUserIdFromJWT";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    let connection;
    try {
        connection = await getConnection();
        const { changeusername, changeemail, changepassword, oldpassword } = req.body;
        console.log(oldpassword)
        if (!oldpassword) {
            return res.status(400).json({ message: "Old password is required" });
        }

        const userID = getUserIdFromJWT(req, res);
        if (!userID) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const [user] = await connection.execute<any[]>(`
            SELECT * FROM users WHERE id = ?;
        `, [userID]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(oldpassword, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid old password" });
        }

        // Check if the username or email already exists in the database for another user
        if (changeusername) {
            const [existingUsername] = await connection.execute<any[]>(`
                SELECT id FROM users WHERE username = ? AND id <> ?;
            `, [changeusername, userID]);
            if (existingUsername.length > 0) {
                return res.status(409).json({ message: "Username already exists" });
            }
        }
        if (changeemail) {
            const [existingEmail] = await connection.execute<any[]>(`
                SELECT id FROM users WHERE email = ? AND id <> ?;
            `, [changeemail, userID]);
            if (existingEmail.length > 0) {
                return res.status(409).json({ message: "Email already exists" });
            }
        }

        // Only update the fields that are not empty and unique
        const queryParts = [];
        const queryParams = [];

        if (changeusername) {
            queryParts.push("username = ?");
            queryParams.push(changeusername);
        }
        if (changeemail) {
            queryParts.push("email = ?");
            queryParams.push(changeemail);
        }
        if (changepassword) {
            const hashedPassword = await bcrypt.hash(changepassword, 10);
            queryParts.push("password = ?");
            queryParams.push(hashedPassword);
        }

        if (queryParts.length > 0) {
            const updateQuery = `UPDATE users SET ${queryParts.join(", ")} WHERE id = ?`;
            queryParams.push(userID);
            await connection.execute(updateQuery, queryParams);
            res.status(200).json({ message: "Credentials updated successfully" });
        } else {
            res.status(400).json({ message: "No fields to update" });
        }

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

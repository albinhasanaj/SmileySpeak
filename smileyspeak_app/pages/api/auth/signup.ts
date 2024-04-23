import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/lib/connectToDB';
import { generateToken } from '@/utils/generateToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        let connection;
        try {
            connection = await getConnection();
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }
            // check if username already exists
            const [rows] = await connection.execute<any[]>('SELECT * FROM users WHERE username = ?', [username]);

            if (rows.length > 0) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // check if email already exists
            const [emailRows] = await connection.execute<any[]>('SELECT * FROM users WHERE email = ?', [email]);

            if (emailRows.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userID = randomUUID();
            const profilePicture = `https://avatar.iran.liara.run/public/?username=${username}`

            const sqlQuery = `INSERT INTO users (id, username, email, profilePicture, password) VALUES (?, ?, ?, ?, ?)`;
            const values = [userID, username, email, profilePicture, hashedPassword];

            await connection.execute(sqlQuery, values);

            // jwt token generation
            const token = generateToken(userID);
            res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000;`); // 30 days

            res.status(200).json({ message: 'User signed up successfully' });
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        } finally {
            if (connection) {
                connection.release();
            };
        }
    }
};
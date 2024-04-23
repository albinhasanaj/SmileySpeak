import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from '@/lib/connectToDB';
import { generateToken } from '@/utils/generateToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        let connection;
        try {
            const connection = await getConnection();
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Please fill in all fields' });
            }

            // check if username exists
            const [rows] = await connection.execute<any[]>('SELECT * FROM users WHERE username = ?', [username]);

            if (rows.length === 0) {
                return res.status(400).json({ message: 'Invalid username or password' });
            };

            const user = rows[0]; // gets the first user
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid username or password' });
            };

            // jwt token generation
            const token = generateToken(user.id);
            res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000;`); // 30 days

            res.status(200).json({ message: 'Logged in successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        } finally {
            if (connection) {
                (connection as any).release();
            };
        };
    }
};
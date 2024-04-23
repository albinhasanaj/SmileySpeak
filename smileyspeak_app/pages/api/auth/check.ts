import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        return res.status(200).json({ message: "Authenticated" });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
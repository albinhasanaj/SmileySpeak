import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

type Decoded = {
    id: string;
    iat: number;
    exp: number;
};


export function getUserIdFromJWT(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return (decoded as Decoded).id;

    } catch (error: any) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
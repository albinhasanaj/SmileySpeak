import jwt from 'jsonwebtoken';

export function generateToken(userId: string) {
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '30d'
    });
};
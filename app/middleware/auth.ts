import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable');
}

export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string } {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export async function authMiddleware(request: NextRequest) {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
        );
    }

    try {
        const decoded = verifyToken(token);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
} 
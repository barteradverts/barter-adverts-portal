import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { error: 'Verification token is required' },
                { status: 400 }
            );
        }

        // Find user and include verification token fields
        const user = await User.findOne({
            emailVerificationToken: token
        }).select('+emailVerificationToken +emailVerificationExpiresAt');

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid verification token' },
                { status: 400 }
            );
        }

        // Check if token is expired
        if (!user.emailVerificationExpiresAt || user.emailVerificationExpiresAt < new Date()) {
            return NextResponse.json(
                { error: 'Verification token has expired' },
                { status: 400 }
            );
        }

        // Update user verification status and clear token
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpiresAt = undefined;
        await user.save();

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully'
        });

    } catch (error: any) {
        console.error('Email verification error:', error);
        return NextResponse.json(
            { error: 'Email verification failed' },
            { status: 500 }
        );
    }
} 
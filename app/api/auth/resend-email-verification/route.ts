import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';
import { generateEmailToken, getExpiryTime, sendVerificationEmail } from '@/app/lib/services';

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { email } = body;
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        if (user.isEmailVerified) {
            return NextResponse.json({ error: 'Email is already verified' }, { status: 400 });
        }
        // Generate new token and expiry
        const emailToken = generateEmailToken();
        user.emailVerificationToken = emailToken;
        user.emailVerificationExpiresAt = getExpiryTime(1440); // 24 hours
        await user.save();
        await sendVerificationEmail(email, emailToken);
        return NextResponse.json({ success: true, message: 'Verification email sent' });
    } catch (error: any) {
        console.error('Resend email verification error:', error);
        return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }
} 
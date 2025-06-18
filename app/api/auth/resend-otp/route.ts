import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';
import { generateOTP, getExpiryTime, sendOTP } from '@/app/lib/services';

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { phoneNumber } = body;

        if (!phoneNumber) {
            return NextResponse.json(
                { error: 'Phone number is required' },
                { status: 400 }
            );
        }

        // Find user
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Generate new OTP
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiresAt = getExpiryTime(10); // 10 minutes
        await user.save();

        // Send OTP
        await sendOTP(phoneNumber, otp);

        return NextResponse.json({
            success: true,
            message: 'OTP resent successfully'
        });

    } catch (error: any) {
        console.error('Resend OTP error:', error);
        return NextResponse.json(
            { error: 'Failed to resend OTP' },
            { status: 500 }
        );
    }
} 
import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { phoneNumber, otp } = body;

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }

    // Find user and include OTP fields
    const user = await User.findOne({ phoneNumber }).select('+otp +otpExpiresAt');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if OTP exists and is not expired
    if (!user.otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Verify OTP
    if (user.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // Update user verification status and clear OTP
    user.isPhoneVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Phone number verified successfully'
    });

  } catch (error: any) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'OTP verification failed' },
      { status: 500 }
    );
  }
}

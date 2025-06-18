import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { phoneNumber, pin } = body;

    if (!phoneNumber || !pin) {
      return NextResponse.json(
        { error: 'Phone number and PIN are required' },
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

    // Check if phone is verified
    if (!user.isPhoneVerified) {
      return NextResponse.json(
        { error: 'Phone number not verified' },
        { status: 403 }
      );
    }

    // Set PIN (will be hashed by pre-save hook)
    user.pin = pin;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'PIN setup successful. You can now log in with your PIN.'
    });

  } catch (error: any) {
    console.error('PIN setup error:', error);
    return NextResponse.json(
      { error: 'PIN setup failed', details: error.message },
      { status: 500 }
    );
  }
}

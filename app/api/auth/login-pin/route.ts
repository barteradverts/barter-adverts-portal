import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';
import { generateToken } from '@/app/middleware/auth';

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

    // Find user and include PIN field
    const user = await User.findOne({ phoneNumber }).select('+pin');

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid phone number or PIN' },
        { status: 401 }
      );
    }

    // Check if phone is verified
    if (!user.isPhoneVerified) {
      return NextResponse.json(
        { error: 'Please verify your phone number first' },
        { status: 403 }
      );
    }

    // Check if PIN is set up
    if (!user.pin) {
      return NextResponse.json(
        { error: 'PIN not set up. Please set up your PIN first.' },
        { status: 400 }
      );
    }

    // Verify PIN
    const isValidPin = await user.comparePin(pin);
    if (!isValidPin) {
      return NextResponse.json(
        { error: 'Invalid phone number or PIN' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Return user data and token
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
        company: user.company,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified
      },
      redirect: user.userType === 'super_admin' ? '/admin' : '/dashboard'
    });

  } catch (error: any) {
    console.error('PIN login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';
import { generateOTP, generateEmailToken, getExpiryTime, sendOTP, sendVerificationEmail } from '@/app/lib/services';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      countryCode,
      userType,
      company,
      description,
      fullPhoneNumber // Handle both formats
    } = body;

    // Validate required fields
    const missingFields = [];
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!userType) missingFields.push('userType');
    if (!phoneNumber && !fullPhoneNumber) missingFields.push('phoneNumber');

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          fields: missingFields
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Handle phone number format
    const finalPhoneNumber = fullPhoneNumber || `${countryCode}${phoneNumber}`;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber: finalPhoneNumber }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { error: 'User with this phone number already exists' },
          { status: 400 }
        );
      }
    }

    // Generate OTP and email verification token
    const otp = generateOTP();
    const emailToken = generateEmailToken();

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber: finalPhoneNumber,
      countryCode: countryCode || '+91',
      userType,
      company,
      description,
      otp,
      otpExpiresAt: getExpiryTime(10), // 10 minutes
      emailVerificationToken: emailToken,
      emailVerificationExpiresAt: getExpiryTime(1440), // 24 hours
    });

    // Send OTP and verification email
    await Promise.all([
      sendOTP(finalPhoneNumber, otp),
      sendVerificationEmail(email, emailToken)
    ]);

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please verify your email and phone number.'
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed', details: error.message },
      { status: 500 }
    );
  }
}

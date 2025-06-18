import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    countryCode: {
        type: String,
        required: true,
        default: '+91'
    },
    userType: {
        type: String,
        enum: ['advertiser', 'media-owner'],
        required: true
    },
    company: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        select: false
    },
    otpExpiresAt: {
        type: Date,
        select: false
    },
    emailVerificationToken: {
        type: String,
        select: false
    },
    emailVerificationExpiresAt: {
        type: Date,
        select: false
    },
    pin: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Hash PIN before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('pin')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.pin = await bcrypt.hash(this.pin, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to compare PIN
userSchema.methods.comparePin = async function (candidatePin: string) {
    return bcrypt.compare(candidatePin, this.pin);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema); 
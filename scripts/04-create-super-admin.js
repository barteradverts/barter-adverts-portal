const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string - replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/barter-adverts';

console.log('Starting super admin creation script...');
console.log('MongoDB URI:', MONGODB_URI);

// User schema (same as in the app)
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
        enum: ['advertiser', 'media-owner', 'super_admin'],
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
    } catch (error) {
        next(error);
    }
});

// Hash PIN before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('pin') || !this.pin) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.pin = await bcrypt.hash(this.pin.toString(), salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

async function createSuperAdmin() {
    try {
        console.log('Connecting to MongoDB...');
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully');

        // Check if super admin already exists
        console.log('Checking if super admin already exists...');
        const existingAdmin = await User.findOne({ email: 'admin@demo.com' });
        if (existingAdmin) {
            console.log('Super admin already exists with email: admin@demo.com');
            console.log('User ID:', existingAdmin._id);
            console.log('User Type:', existingAdmin.userType);
            return;
        }

        console.log('Creating super admin user...');
        // Create super admin user
        const superAdmin = new User({
            firstName: 'Admin',
            lastName: '',
            email: 'admin@demo.com',
            password: 'demo123', // This will be hashed by the pre-save hook
            phoneNumber: '+911234567891',
            countryCode: '+91',
            userType: 'super_admin',
            company: 'Company Name',
            description: 'Brief Description',
            isEmailVerified: true,
            isPhoneVerified: true,
            pin: '1234' // This will be hashed by the pre-save hook
        });

        await superAdmin.save();
        console.log('Super admin created successfully!');
        console.log('User ID:', superAdmin._id);
        console.log('Email: admin@demo.com');
        console.log('Password: demo123');
        console.log('PIN: 1234');
        console.log('Phone: +911234567891');

    } catch (error) {
        console.error('Error creating super admin:', error);
        console.error('Error details:', error.message);
    } finally {
        try {
            await mongoose.disconnect();
            console.log('Disconnected from MongoDB');
        } catch (disconnectError) {
            console.error('Error disconnecting from MongoDB:', disconnectError);
        }
    }
}

// Run the script
console.log('Starting the script...');
createSuperAdmin().then(() => {
    console.log('Script completed');
    process.exit(0);
}).catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
}); 
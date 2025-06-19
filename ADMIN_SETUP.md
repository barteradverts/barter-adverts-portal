# Admin Dashboard Setup and Testing

## Overview
The admin dashboard has been implemented with super_admin user type support and real database integration. When a user with `userType: 'super_admin'` logs in, they will be automatically redirected to the admin dashboard at `/admin`. The system now uses real MongoDB data instead of dummy/hardcoded data.

## Implementation Details

### 1. User Model Updates
- Updated `app/models/User.ts` to include `'super_admin'` in the userType enum
- Fixed PIN hashing to handle undefined values

### 2. Authentication API Updates
- Updated all login APIs (`/api/auth/login`, `/api/auth/login-pin`, `/api/auth/verify-otp`) to include a `redirect` field
- Super admin users get redirected to `/admin`, regular users to `/dashboard`
- **NEW**: Admin auth route (`/api/admin/auth`) now uses real database authentication instead of hardcoded credentials

### 3. Login Page Updates
- Updated `app/login/page.tsx` to handle admin redirects based on userType
- All login methods (email/password, PIN, OTP) now support admin redirects

### 4. Admin Dashboard Protection
- Updated `app/admin/layout.tsx` to check for super_admin userType
- Unauthorized users are redirected to appropriate pages
- Added loading states and proper error handling

### 5. Admin Dashboard Integration
- Updated `app/admin/page.tsx` to use regular user authentication
- Removed dependency on separate admin auth system
- Added proper logout functionality

### 6. Database Integration (NEW)
- **Admin Dashboard API** (`/api/admin/dashboard`) now fetches real user statistics from MongoDB
- **Pending Users API** (`/api/admin/users/pending`) fetches real users needing verification
- **User Approval APIs** (`/api/admin/users/[id]/approve`, `/api/admin/users/[id]/reject`) actually update user verification status
- **User Approval Queries** (`lib/database/user-approval-queries.ts`) use real database queries instead of fallback data
- **Fallback Data** (`lib/database/fallback-data.ts`) updated to remove hardcoded admin credentials

## Setup Instructions

### 1. Create Super Admin User
Run the following command to create the super admin user in your MongoDB database:

```bash
node scripts/04-create-super-admin.js
```

This will create a user with the following credentials:
- **Email**: admin@demo.com
- **Password**: demo123
- **PIN**: 1234
- **Phone**: +911234567891
- **User Type**: super_admin

### 2. Environment Variables
Make sure you have the following environment variables set:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Testing the Admin Functionality

### 1. Login as Super Admin
1. Go to `/login`
2. Use any of the three login methods:
   - **Email/Password**: admin@demo.com / demo123
   - **Phone/PIN**: +911234567891 / 1234
   - **Phone/OTP**: +911234567891 (OTP will be sent)

### 2. Automatic Redirect
After successful login, super admin users will be automatically redirected to `/admin`

### 3. Admin Dashboard Features
The admin dashboard now includes **real data**:
- **User Statistics**: Real user counts from MongoDB
- **Pending Users**: Real users needing email/phone verification
- **User Approval System**: Actually updates user verification status in database
- **Bulk Operations**: Real bulk approval functionality
- **Analytics**: Real-time statistics from database

### 4. Security Features
- Only users with `userType: 'super_admin'` can access `/admin`
- Proper session validation with JWT tokens
- Unauthorized users are redirected to appropriate pages
- Email and phone verification required for login
- **NEW**: Admin authentication uses real database validation

## Database Schema

The super admin user will have the following structure in MongoDB:
```json
{
  "_id": "6853059c8a96714c3900ee9e",
  "firstName": "Admin",
  "lastName": "",
  "email": "admin@demo.com",
  "password": "$2b$10$cKifGqRlCY6CkuWrb1SmvenWh1L9dpVX2qN7lkaVdj22LjwlJpeK6",
  "phoneNumber": "+911234567891",
  "countryCode": "+91",
  "userType": "super_admin",
  "company": "Company Name",
  "description": "Brief Description",
  "isEmailVerified": true,
  "isPhoneVerified": true,
  "pin": "$2b$10$b7EmoT6U12X2YKWbLc9SD.pWEzzRfxeIWkn4olGTvbepXfwzZgzQG",
  "createdAt": "2025-06-17T17:02:32.316+00:00",
  "updatedAt": "2025-06-18T16:22:10.293+00:00"
}
```

## API Endpoints

The following API endpoints support admin redirects and real database integration:
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/login-pin` - Phone/PIN login
- `POST /api/auth/verify-otp` - Phone/OTP verification
- `POST /api/admin/auth` - Admin authentication (uses database)
- `GET /api/admin/dashboard` - Admin dashboard statistics (real data)
- `GET /api/admin/users/pending` - Pending users (real data)
- `POST /api/admin/users/[id]/approve` - Approve user (updates database)
- `POST /api/admin/users/[id]/reject` - Reject user (logs to database)
- `POST /api/admin/users/bulk-approve` - Bulk approve users (updates database)

All endpoints return a `redirect` field indicating where the user should be redirected based on their userType.

## Changes Made

### Removed Dummy Data
- ✅ Removed hardcoded admin credentials from `/api/admin/auth/route.ts`
- ✅ Updated admin dashboard to use real user statistics
- ✅ Updated pending users API to fetch real users from database
- ✅ Updated user approval APIs to actually modify database records
- ✅ Updated user approval queries to use real database queries
- ✅ Updated fallback data to remove hardcoded admin references

### Database Integration
- ✅ Admin authentication now validates against real user records
- ✅ User statistics are calculated from actual database records
- ✅ Pending users are fetched based on verification status
- ✅ User approval/rejection actually updates user records
- ✅ Bulk operations work with real database records

## Troubleshooting

### 1. Login Issues
- Ensure MongoDB is running and accessible
- Check that the super admin user was created successfully
- Verify environment variables are set correctly

### 2. Redirect Issues
- Clear browser localStorage if testing with different user types
- Check browser console for any JavaScript errors
- Verify that the user object in localStorage has the correct userType

### 3. Admin Access Issues
- Ensure the user has `userType: 'super_admin'`
- Check that both email and phone are verified
- Verify JWT token is valid and not expired

## API Endpoints

The following API endpoints support admin redirects:
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/login-pin` - Phone/PIN login
- `POST /api/auth/verify-otp` - Phone/OTP verification

All endpoints return a `redirect` field indicating where the user should be redirected based on their userType. 
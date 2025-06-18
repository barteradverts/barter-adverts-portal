-- Seed initial admin users and sample data

-- Insert admin users
INSERT INTO admin_users (id, name, email, password_hash, role) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Super Admin', 'admin@barteradverts.com', '$2b$10$rQZ8kqVZ8qVZ8qVZ8qVZ8O', 'super_admin'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Content Manager', 'content@barteradverts.com', '$2b$10$rQZ8kqVZ8qVZ8qVZ8qVZ8O', 'content_admin'),
    ('550e8400-e29b-41d4-a716-446655440003', 'Support Manager', 'support@barteradverts.com', '$2b$10$rQZ8kqVZ8qVZ8qVZ8qVZ8O', 'support_admin');

-- Insert sample users
INSERT INTO users (id, first_name, last_name, email, phone_number, user_type, company, status, verified) VALUES
    ('550e8400-e29b-41d4-a716-446655440010', 'Demo', 'Advertiser', 'demo.advertiser@example.com', '+919876543210', 'advertiser', 'Demo Advertising Co.', 'approved', true),
    ('550e8400-e29b-41d4-a716-446655440011', 'Demo', 'Media Owner', 'demo.media@example.com', '+919876543211', 'media-owner', 'Demo Media Solutions', 'approved', true),
    ('550e8400-e29b-41d4-a716-446655440012', 'Rajesh', 'Kumar', 'rajesh@example.com', '+919876543212', 'media-owner', 'Rajesh Enterprises', 'pending', false),
    ('550e8400-e29b-41d4-a716-446655440013', 'Priya', 'Sharma', 'priya@example.com', '+919876543213', 'advertiser', 'Digital Marketing Pro', 'pending', false);

-- Insert sample listings
INSERT INTO listings (id, title, type, category, description, location, value, seeking, owner_id, status) VALUES
    ('550e8400-e29b-41d4-a716-446655440020', 'Instagram Food Account - 45K Followers', 'media', 'social-media-instagram', 'Authentic food content creator with engaged Mumbai audience.', 'Mumbai', 25000, 'Restaurant vouchers, Food products', '550e8400-e29b-41d4-a716-446655440011', 'approved'),
    ('550e8400-e29b-41d4-a716-446655440021', 'Premium Coffee Subscription', 'barter', 'food-beverages', 'Offering 6-month premium coffee subscription for advertising exposure.', 'Bangalore', 15000, 'Billboard space, Influencer posts', '550e8400-e29b-41d4-a716-446655440010', 'approved'),
    ('550e8400-e29b-41d4-a716-446655440022', 'Billboard - Prime Location MG Road', 'media', 'outdoor', 'High-traffic billboard on MG Road. Perfect visibility for businesses.', 'Delhi', 50000, 'Office furniture, Tech equipment', '550e8400-e29b-41d4-a716-446655440012', 'pending');

-- Insert sample deals
INSERT INTO deals (id, title, advertiser_id, media_owner_id, status, value, start_date, end_date) VALUES
    ('550e8400-e29b-41d4-a716-446655440030', 'Coffee Subscription for Billboard Space', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011', 'active', 15000, '2024-01-15', '2024-02-15');

-- Insert sample disputes
INSERT INTO disputes (id, deal_id, complainant_id, respondent_id, title, description, status, priority) VALUES
    ('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011', 'Coffee delivery not completed', 'The agreed coffee delivery for January was not received as per the deal terms.', 'open', 'high');

-- Insert sample user documents
INSERT INTO user_documents (user_id, document_type, document_url, file_name, status) VALUES
    ('550e8400-e29b-41d4-a716-446655440012', 'gst_certificate', '/uploads/documents/gst_cert_rajesh.pdf', 'GST Certificate - Rajesh Enterprises.pdf', 'pending'),
    ('550e8400-e29b-41d4-a716-446655440012', 'business_license', '/uploads/documents/business_license_rajesh.pdf', 'Business License - Rajesh Enterprises.pdf', 'pending'),
    ('550e8400-e29b-41d4-a716-446655440013', 'business_license', '/uploads/documents/business_license_priya.pdf', 'Business Registration - Digital Marketing Pro.pdf', 'pending');

-- Insert sample admin notifications
INSERT INTO admin_notifications (type, title, message, priority) VALUES
    ('user_verification', 'New User Verification Required', 'Rajesh Kumar has submitted documents for verification', 'high'),
    ('listing_approval', 'Listing Pending Approval', 'New billboard listing in Delhi requires content review', 'medium'),
    ('dispute_created', 'New Dispute Opened', 'High priority dispute regarding coffee delivery', 'urgent');

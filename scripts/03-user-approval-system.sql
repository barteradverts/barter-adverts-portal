-- Enhanced user approval system tables

-- Update users table with approval fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS approval_status VARCHAR(20) DEFAULT 'pending' CHECK (approval_status IN ('pending', 'under_review', 'approved', 'rejected', 'suspended'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS approval_date TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES admin_users(id);
ALTER TABLE users ADD COLUMN IF NOT EXISTS rejection_reason TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_score INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS risk_level VARCHAR(10) DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high'));

-- User documents table for verification
CREATE TABLE IF NOT EXISTS user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('gst_certificate', 'business_license', 'pan_card', 'aadhar_card', 'company_registration', 'bank_statement', 'portfolio', 'other')),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
    verified_by UUID REFERENCES admin_users(id),
    verified_at TIMESTAMP,
    rejection_reason TEXT,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User verification checklist
CREATE TABLE IF NOT EXISTS user_verification_checklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    identity_verified BOOLEAN DEFAULT FALSE,
    business_verified BOOLEAN DEFAULT FALSE,
    financial_verified BOOLEAN DEFAULT FALSE,
    portfolio_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    address_verified BOOLEAN DEFAULT FALSE,
    references_verified BOOLEAN DEFAULT FALSE,
    verification_score INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Approval workflow tracking
CREATE TABLE IF NOT EXISTS approval_workflow (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    step_name VARCHAR(50) NOT NULL,
    step_order INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped', 'failed')),
    assigned_to UUID REFERENCES admin_users(id),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User approval history
CREATE TABLE IF NOT EXISTS user_approval_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    admin_id UUID REFERENCES admin_users(id),
    reason TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bulk approval batches
CREATE TABLE IF NOT EXISTS approval_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_name VARCHAR(100) NOT NULL,
    admin_id UUID NOT NULL REFERENCES admin_users(id),
    total_users INTEGER DEFAULT 0,
    approved_users INTEGER DEFAULT 0,
    rejected_users INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_approval_status ON users(approval_status);
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_status ON user_documents(status);
CREATE INDEX IF NOT EXISTS idx_approval_workflow_user_id ON approval_workflow(user_id);
CREATE INDEX IF NOT EXISTS idx_user_approval_history_user_id ON user_approval_history(user_id);

-- Insert default workflow steps
INSERT INTO approval_workflow (user_id, step_name, step_order, status) 
SELECT id, 'document_upload', 1, 'pending' FROM users WHERE approval_status = 'pending'
ON CONFLICT DO NOTHING;

INSERT INTO approval_workflow (user_id, step_name, step_order, status) 
SELECT id, 'document_review', 2, 'pending' FROM users WHERE approval_status = 'pending'
ON CONFLICT DO NOTHING;

INSERT INTO approval_workflow (user_id, step_name, step_order, status) 
SELECT id, 'business_verification', 3, 'pending' FROM users WHERE approval_status = 'pending'
ON CONFLICT DO NOTHING;

INSERT INTO approval_workflow (user_id, step_name, step_order, status) 
SELECT id, 'final_approval', 4, 'pending' FROM users WHERE approval_status = 'pending'
ON CONFLICT DO NOTHING;

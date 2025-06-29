-- Create the `companies` table
DROP TABLE IF EXISTS companies;
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    tax_id VARCHAR(14) NOT NULL, --id_fiscal
    logo VARCHAR(255),
    currency VARCHAR(2) NOT NULL DEFAULT '$',
    address VARCHAR(255),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    -- id_user INT NOT NULL, -- now in `branches` table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (currency IN ('$','€','£','¥','₩','₹','₽','₺','₪','₫'))
);

COMMIT;

-- Delete all content from the `companies` table
DELETE FROM companies;
-- Delete the `id_auth` column from the `companies` table
ALTER TABLE companies
    DROP COLUMN IF EXISTS id_auth;
-- Add a new column `id_auth` to the `companies` table
ALTER TABLE companies
    ADD COLUMN IF NOT EXISTS id_auth VARCHAR(50) UNIQUE NOT NULL;
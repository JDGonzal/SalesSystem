-- Create the `branches` table
DROP TABLE IF EXISTS branches;
CREATE TABLE IF NOT EXISTS branches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15),
    email VARCHAR(100),
    id_company INT NOT NULL,
    id_user INT NOT NULL, -- Will be removed later
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_company FOREIGN KEY (id_company) REFERENCES companies(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

-- Delete the `id_user` column from the `branches` table
ALTER TABLE branches
    DROP COLUMN IF EXISTS id_user;
-- Add a new columns `cnpj`, `logo`, `currency` to the `branches` table
ALTER TABLE branches
    ADD COLUMN IF NOT EXISTS logo VARCHAR(255),
    ADD COLUMN IF NOT EXISTS currency VARCHAR(2) NOT NULL DEFAULT '$';
-- Add a check for the `currency` column in `branches` table
ALTER TABLE branches
    ADD CONSTRAINT chk_currency CHECK (currency IN ('$','€','£','¥','₩','₹','₽','₺','₪','₫'));

-- ?Policies for `branches` table
-- SELECT
CREATE POLICY "Enable read access for all users" 
ON "public"."branches"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);

-- INSERT
CREATE POLICY "Enable insert access for all users"
ON "public"."branches"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "Enable update access for all users"
ON "public"."branches"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (id=id)
WITH CHECK (id=id);

-- DELETE
CREATE POLICY "Enable delete access for all users"
ON "public"."branches"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (id=id);

COMMIT;
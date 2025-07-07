-- Create the `users` table
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    id_type INT NOT NULL,
    document VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(15),
    id_role INT NOT NULL,
    address VARCHAR(255),
    id_auth VARCHAR(50) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ?Policies for `users` table
-- SELECT
CREATE POLICY "Enable read access for all users" 
ON "public"."users"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);

-- INSERT
CREATE POLICY "Enable insert access for all users"
ON "public"."users"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "Enable update access for all users"
ON "public"."users"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (id=id)
WITH CHECK (id=id);

-- DELETE
CREATE POLICY "Enable delete access for all users"
ON "public"."users"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (id=id);

COMMIT;
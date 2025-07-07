-- Create the `roles` table
DROP TABLE IF EXISTS roles;
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Add foreign key from `users` to `roles` table
ALTER TABLE users
ADD CONSTRAINT fk_role FOREIGN KEY (id_role) REFERENCES roles(id) ON DELETE CASCADE;

-- Insert initial data into `roles`
INSERT INTO roles (name, description) VALUES
('Admin', 'Adminstrador del sistema'),
('User', 'Usuario regular'),
('Manager', 'Gerente de sucursal'),
('Accountant', 'Contador de la empresa'),
('Support', 'Soporte técnico');

-- ?Policies for `roles` table
-- SELECT
CREATE POLICY "Enable read access for all users" 
ON "public"."roles"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);

-- INSERT
CREATE POLICY "Enable insert access for all users"
ON "public"."roles"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "Enable update access for all users"
ON "public"."roles"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (id=id)
WITH CHECK (id=id);

-- DELETE
CREATE POLICY "Enable delete access for all users"
ON "public"."roles"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (id=id);

COMMIT;
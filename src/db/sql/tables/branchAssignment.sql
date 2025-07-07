-- Create the `branch_assignments` table
DROP TABLE IF EXISTS branch_assignments;
CREATE TABLE IF NOT EXISTS branch_assignments (
    id SERIAL PRIMARY KEY,
    id_branch INT NOT NULL,
    id_user INT, -- NOT NULL,
    --role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_branch FOREIGN KEY (id_branch) REFERENCES branches(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_branch_user UNIQUE (id_branch, id_user)
);

-- SELECT
CREATE POLICY "Enable read access for all users" 
ON "public"."branch_assignments"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);

-- INSERT
CREATE POLICY "Enable insert access for all users"
ON "public"."branch_assignments"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "Enable update access for all users"
ON "public"."branch_assignments"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (id=id)
WITH CHECK (id=id);

-- DELETE
CREATE POLICY "Enable delete access for all users"
ON "public"."branch_assignments"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (id=id);

COMMIT;
/*
  * Drop all tables before creating them
  * This is useful for development purposes
*/
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS doc_types CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS branches CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

/*
  * Table Creation Scripts
*/
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

-- Create the `doc_types` table
DROP TABLE IF EXISTS doc_types;
CREATE TABLE IF NOT EXISTS doc_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    id_company INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
    id_auth VARCHAR(50) UNIQUE NOT NULL, -- ADD COLUMN
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the `branches` table
DROP TABLE IF EXISTS branches;
CREATE TABLE IF NOT EXISTS branches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(15),
    email VARCHAR(100),
    id_company INT NOT NULL,
    --id_user INT NOT NULL,
    logo VARCHAR(255), -- added later
    currency VARCHAR(2) NOT NULL DEFAULT '$', -- added later
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the `roles` table
DROP TABLE IF EXISTS roles;
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the `categories` table
DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20),
    icon VARCHAR(100),
    description TEXT,
    id_company INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the `branch_assignments` table
DROP TABLE IF EXISTS branch_assignments;
CREATE TABLE IF NOT EXISTS branch_assignments (
    id SERIAL PRIMARY KEY,
    id_branch INT NOT NULL,
    id_user INT,-- NOT NULL,
    --role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*
  * Add a check constrain to the `companies`, and `branches` tables
  * Ensure that the column is not null
*/
-- Add a check for the `currency` column in `companies` table
ALTER TABLE companies
    ADD CONSTRAINT chk_currency CHECK (currency IN ('$','€','£','¥','₩','₹','₽','₺','₪','₫'));

-- Add a check for the `currency` column in `branches` table
ALTER TABLE branches
    ADD CONSTRAINT chk_currency CHECK (currency IN ('$','€','£','¥','₩','₹','₽','₺','₪','₫'));

/* 
 * Add foreign keys to the `users`, `doc_types`, `companies`, and `branches` tables
 * Ensure that the foreign keys are set to cascade on delete
*/
-- Add foreign key from `users` to `doc_types` table
ALTER TABLE users 
    ADD CONSTRAINT fk_doc_type FOREIGN KEY (id_type) REFERENCES doc_types(id) ON DELETE CASCADE;

-- Add foreign key from `users` to `roles` table
ALTER TABLE users
ADD CONSTRAINT fk_role FOREIGN KEY (id_role) REFERENCES roles(id) ON DELETE CASCADE;

-- Add foreign key from `doc_types` to `companies` table
ALTER TABLE doc_types 
    ADD CONSTRAINT fk_company FOREIGN KEY (id_company) REFERENCES companies(id) ON DELETE CASCADE; 

-- Add foreign key from `branches` to `users` table
-- ALTER TABLE branches 
--     ADD CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE;

-- Add foreign key from `branches` to `companies` table
ALTER TABLE branches 
    ADD CONSTRAINT fk_company FOREIGN KEY (id_company) REFERENCES companies(id) ON DELETE CASCADE;

-- Add forenin key from `categories` to `companies` table
ALTER TABLE categories 
    ADD CONSTRAINT fk_company FOREIGN KEY (id_company) REFERENCES companies(id) ON DELETE CASCADE; 

-- Add foreign key from `branch_assignments` to `branches` table
ALTER TABLE branch_assignments 
    ADD CONSTRAINT fk_branch FOREIGN KEY (id_branch) REFERENCES branches(id) ON DELETE CASCADE;

-- Add foreign key from `branch_assignments` to `users` table
ALTER TABLE branch_assignments 
    ADD CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE;

-- Add a unique constraint to the `branch_assignments` table
ALTER TABLE branch_assignments 
    ADD CONSTRAINT unique_branch_user UNIQUE (id_branch, id_user);

/* 
  * Insert initial data into `roles` table
  * This is just an example, you can modify it as needed
*/
-- Insert initial data into `roles`
INSERT INTO roles (name, description) VALUES
('Admin', 'Administrador del sistema'),
('User', 'Usuario regular'),
('Manager', 'Gerente de sucursal'),
('Accountant', 'Contador de la empresa'),
('Support', 'Soporte técnico');

/*
  * Create new functions and triggers
*/
-- Create the `fnc_after_companies_insert` function to insert a new elements after insert in `companies` table.
CREATE OR REPLACE FUNCTION fnc_after_companies_insert()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    -- Insert the new doc-Types into the `doc_types` table
    INSERT INTO doc_types (name, description, id_company)
    VALUES
        (CONCAT('CC',CAST(NEW.id AS VARCHAR)), 'Cédula de Ciudadanía', NEW.id),
        (CONCAT('NIT',CAST(NEW.id AS VARCHAR)), 'Registro Nacional de Persona Jurídica', NEW.id),
        (CONCAT('RG',CAST(NEW.id AS VARCHAR)), 'Registro Geral', NEW.id),
        (CONCAT('CE',CAST(NEW.id AS VARCHAR)), 'Cédula de Extranjería', NEW.id),
        (CONCAT('Pasaporte',CAST(NEW.id AS VARCHAR)), 'Documento de viaje internacional', NEW.id);
    -- Insert the new branches into the `branches` table
    INSERT INTO branches (name, address, phone, email, id_company, logo, currency)
    VALUES
        (NEW.name, NEW.address, NEW.phone, NEW.email, NEW.id, NEW.logo, NEW.currency);
    -- Return the new row
    RETURN NEW;
END
$$;

-- Create trigger to insert new doc types and branches after a new company is inserted.
CREATE OR REPLACE TRIGGER trg_after_companies_insert
  AFTER INSERT ON companies
  FOR EACH ROW
  EXECUTE FUNCTION fnc_after_companies_insert();

/*
!Create the `fnc_after_users_insert` function to insert a new branch into the database.
CREATE OR REPLACE FUNCTION fnc_after_users_insert()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    -- Insert the new company into the `companies` table
    INSERT INTO branches (
        name,
        address,
        phone,
        email,
        id_company,
        id_user,
        created_at,
        updated_at
    )
    VALUES
        (NEW.name, NEW.address, NEW.phone, NEW.email, NEW.id_company, NEW.id_user, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ;

    -- Return the new row
    RETURN NEW;
END
$$;
*/
-- !Delete this function because it will be on `fnc_after_companies_insert`
DROP FUNCTION IF EXISTS fnc_after_users_insert() CASCADE;

/*
!Create trigger to handle after insert on users table
CREATE OR REPLACE TRIGGER trg_after_users_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION fnc_after_users_insert();
*/
-- !Delete because it will be on `fnc_after_companies_insert`
DROP TRIGGER IF EXISTS trg_after_users_insert ON users CASCADE;

-- Create the `fnc_category_insert` function to insert a new category into the database.
CREATE OR REPLACE FUNCTION fnc_category_insert(
    _name VARCHAR(100), 
    _color VARCHAR(20), 
    _icon VARCHAR(100), 
    _description TEXT, 
    _id_company INT
)
RETURNS INT LANGUAGE plpgsql AS $$
-- delcare a variable to hold the new category ID
DECLARE new_category_id INT;
BEGIN
    -- Check if the category name already exists
    PERFORM 1 FROM categories WHERE name = _name AND id_company = _id_company;
    IF FOUND THEN
        RAISE EXCEPTION 'Category with name "%" already exists for company ID %', _name, _id_company;
    ELSE
        -- If not found, insert the new category
        INSERT INTO categories (
            name,
            color,
            icon,
            description,
            id_company,
            created_at,
            updated_at
        )
        VALUES
            (_name, _color, _icon, _description, _id_company, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id INTO new_category_id;
        -- Return the new category ID
        RETURN new_category_id;
    END IF;
END
$$;

-- Create the `fnc_after_users_insert` function to insert a new elements after insert in `users` table.
CREATE OR REPLACE FUNCTION fnc_after_users_insert()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE new_id_branch INT;
BEGIN
    -- Select the last user ID to assign the new branch
    SELECT MAX(id) INTO new_id_branch FROM branches;
    -- Update the new user assignment into the `branch_assignments` table
    INSERT INTO branch_assignments (id_branch, id_user)
        VALUES (new_id_branch, NEW.id)
        ON CONFLICT (id_branch, id_user) DO UPDATE
        SET id_branch = EXCLUDED.id_branch, id_user = EXCLUDED.id_user;
    -- Return the new row
    RETURN NEW;
END
$$;

-- Create trigger to update branch assignment after a new user is inserted.
CREATE OR REPLACE TRIGGER trg_after_users_insert
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION fnc_after_users_insert();

/* 
  * Create Policies for the `categories` table
*/
-- SELECT
CREATE POLICY "Enable read access for all users" 
ON "public"."categories"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);

-- INSERT
CREATE POLICY "Enable insert access for all users"
ON "public"."categories"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "Enable update access for all users"
ON "public"."categories"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (id=id)
WITH CHECK (id=id);

-- DELETE
CREATE POLICY "Enable delete access for all users"
ON "public"."categories"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (id=id);

COMMIT;
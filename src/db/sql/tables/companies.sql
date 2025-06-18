-- Create the `companies` table
DROP TABLE IF EXISTS companies;
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    logo VARCHAR(255),
    currency VARCHAR(10) DEFAULT '$',
    address VARCHAR(255),
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (currency IN ('$','€','£','¥','₩','₹','₽','₺','₪','₫'))
);
-- Insert initial data into `companies`
INSERT INTO companies (name, cnpj)
VALUES
    ('Empresa Ejemplo', '12345678000195'),
    ('Otra Empresa', '98765432000176');
COMMIT;
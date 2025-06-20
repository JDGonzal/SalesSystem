-- Create tje `categories` table
DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20),
    icon VARCHAR(100),
    description TEXT,
    id_company INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_company FOREIGN KEY (id_company) REFERENCES companies(id) ON DELETE CASCADE
);
COMMIT;
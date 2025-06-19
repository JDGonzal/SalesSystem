-- Create the `doc_types` table
ALTER TABLE users DROP CONSTRAINT IF EXISTS fk_doc_type;
DROP TABLE IF EXISTS doc_types;
CREATE TABLE IF NOT EXISTS doc_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    id_company INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Add foreign key constraint to `users` table
ALTER TABLE users 
ADD CONSTRAINT fk_doc_type FOREIGN KEY (id_type) REFERENCES doc_types(id) ON DELETE CASCADE;
-- Insert initial data into `doc_types`
INSERT INTO doc_types (name, description, id_company) VALUES
('CC', 'Cédula de Ciudadanía', 1),
('NIT', 'Registro Nacional de Persona Jurídica', 1),
('RG', 'Registro Geral', 1),
('CE', 'Cédula de Extranjería', 1),
('Pasaporte', 'Documento de viaje internacional', 1);
COMMIT;
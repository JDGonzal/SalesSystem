-- Create the `roles` table
DROP TABLE IF EXISTS roles;
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Add foreign key constraint to `users` table
ALTER TABLE users
ADD CONSTRAINT fk_role FOREIGN KEY (id_role) REFERENCES roles(id) ON DELETE CASCADE;
-- Insert initial data into `roles`
INSERT INTO roles (name, description) VALUES
('Admin', 'Administrador del sistema'),
('User', 'Usuario regular'),
('Manager', 'Gerente de sucursal'),
('Accountant', 'Contador de la empresa'),
('Support', 'Soporte técnico');
COMMIT;
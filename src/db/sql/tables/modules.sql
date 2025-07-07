-- Create the `modules` table
DROP TABLE IF EXISTS modules;
CREATE TABLE IF NOT EXISTS modules (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(100),
    checked BOOLEAN DEFAULT FALSE,
    icon VARCHAR(100),
    link VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data into `modules`
INSERT INTO modules (name, description, checked, icon, link) VALUES
('Productos',	'registra tus productos',	TRUE,	'https://i.ibb.co/85zJ6yG/caja-del-paquete.png',	'/configurar/productos'),
('Personal',	'ten el control de tu personal',	TRUE,	'https://i.ibb.co/5vgZ0fX/hombre.png',	'/configurar/usuarios'),
('Tu empresa',	'configura tus opciones básicas',	TRUE,	'https://i.ibb.co/x7mHPgm/administracion-de-empresas.png',	'/configurar/empresa'),
('Categoria de productos',	'asigna categorias a tus productos',	TRUE,	'https://i.ibb.co/VYbMRLZ/categoria.png',	'/config/categories'),
('Marca de productos',	'gestiona tus marcas',	TRUE,	'https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png',	'/configurar/marca');

-- ?Policies for `modules` table
-- SELECT
CREATE POLICY "Enable read access for all users" 
ON "public"."modules"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);

-- INSERT
CREATE POLICY "Enable insert access for all users"
ON "public"."modules"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE
CREATE POLICY "Enable update access for all users"
ON "public"."modules"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (id=id)
WITH CHECK (id=id);

-- DELETE
CREATE POLICY "Enable delete access for all users"
ON "public"."modules"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (id=id);

COMMIT;
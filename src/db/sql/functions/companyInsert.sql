-- Create the `companyInsert` function to insert a new company into the database.
CREATE OR REPLACE FUNCTION fnc_company_insert()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    -- Insert the new company into the `companies` table
    INSERT INTO doc_types (name, description, id_company)
    VALUES
        (CONCAT('CC',CAST(NEW.id AS VARCHAR)), 'Cédula de Ciudadanía', NEW.id),
        (CONCAT('NIT',CAST(NEW.id AS VARCHAR)), 'Registro Nacional de Persona Jurídica', NEW.id),
        (CONCAT('RG',CAST(NEW.id AS VARCHAR)), 'Registro Geral', NEW.id),
        (CONCAT('CE',CAST(NEW.id AS VARCHAR)), 'Cédula de Extranjería', NEW.id),
        (CONCAT('Pasaporte',CAST(NEW.id AS VARCHAR)), 'Documento de viaje internacional', NEW.id);

    -- Return the new row
    RETURN NEW;
END
$$;
COMMIT;
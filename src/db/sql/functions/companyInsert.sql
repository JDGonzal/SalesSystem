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

COMMIT;
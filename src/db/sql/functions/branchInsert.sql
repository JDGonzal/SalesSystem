-- Create the `fnc_branch_insert` function to insert a new company into the database.
CREATE OR REPLACE FUNCTION fnc_branch_insert()
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
COMMIT;
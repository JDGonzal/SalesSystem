-- Create the `fnc_category_insert` function to insert a new category into the database.
CREATE OR REPLACE FUNCTION fnc_category_insert(
    _name VARCHAR(100), 
    _color VARCHAR(20), 
    _icon VARCHAR, 
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
COMMIT;
-- Create the `fnc_category_update` function to update an existing category into the database.
CREATE OR REPLACE FUNCTION fnc_category_update(
    _id INT,
    _name VARCHAR(100), 
    _color VARCHAR(20), 
    _icon VARCHAR, 
    _description TEXT, 
    _id_company INT
)
RETURNS VOID LANGUAGE plpgsql AS $$
-- delcare a variable to hold the new category ID
DECLARE new_category_id INT;
BEGIN
    -- Check if the category name not exists
    PERFORM 1 FROM categories WHERE id != _id AND name = _name ;
    IF FOUND THEN
        RAISE EXCEPTION 'Category with name "%" exists with another ID', _name;
    ELSE
        -- If not found, insert the new category
        UPDATE categories SET
            name = _name,
            color = _color,
            icon = _icon,
            description = _description,
            id_company = _id_company,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = _id;
        -- Return nothing
    END IF;
END
$$;
COMMIT;

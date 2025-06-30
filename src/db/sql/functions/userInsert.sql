-- Create the `fnc_after_users_insert` function to insert a new elements after insert in `users` table.
CREATE OR REPLACE FUNCTION fnc_after_users_insert()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE new_id_branch INT;
BEGIN
    -- Select the last user ID to assign the new branch
    SELECT MAX(id) INTO new_id_branch FROM branches;
    -- Update the new user assignment into the `branch_assignments` table
    INSERT INTO branch_assignments (id_branch, id_user)
        VALUES (new_id_branch, NEW.id)
        ON CONFLICT (id_branch, id_user) DO UPDATE
        SET id_branch = EXCLUDED.id_branch, id_user = EXCLUDED.id_user;
    -- Return the new row
    RETURN NEW;
END
$$;

COMMIT;
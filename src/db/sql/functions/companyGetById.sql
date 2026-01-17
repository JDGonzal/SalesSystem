-- Create the `fnc_company_get_by_id` function to select all from `companies` based on the _user_id
CREATE OR REPLACE FUNCTION fnc_company_get_by_id_user(_id_user int)
RETURNS TABLE(result companies) LANGUAGE plpgsql AS $$
BEGIN
    -- Get all the `companies` based on `_id_user`
    SELECT companies.* FROM branch_assignments 
        INNER JOIN users 
        ON users.id = branch_assignments.id_user 
        INNER JOIN branches 
        ON branches.id = branch_assignments.id_branch 
        INNER JOIN companies
        ON companies.id = branches.id_company
    WHERE branch_assignments.id_user = _id_user;

END
$$;

COMMIT;
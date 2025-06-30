-- Create trigger to update branch assignment after a new user is inserted.
CREATE OR REPLACE TRIGGER trg_after_users_insert
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION fnc_after_users_insert();

COMMIT;
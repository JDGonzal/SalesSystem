-- Create trigger to handle after insert on users table
CREATE OR REPLACE TRIGGER trg_after_users_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION fnc_after_users_insert();

COMMIT;

-- !Delete because it will be on `fnc_after_companies_insert`
DROP TRIGGER IF EXISTS trg_after_users_insert ON users CASCADE;
/* ### Insertando Sucursales (03:13:30)
  * No fue ejecutado en `Supabase`
*/
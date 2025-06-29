-- Create trigger to insert new doc types and branches after a new company is inserted.
CREATE OR REPLACE TRIGGER trg_after_companies_insert
  AFTER INSERT ON companies
  FOR EACH ROW
  EXECUTE FUNCTION fnc_after_companies_insert();

COMMIT;
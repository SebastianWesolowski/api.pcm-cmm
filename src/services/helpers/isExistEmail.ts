import airDB from 'services/airtableClient';

const isExist = async (tableName: string, email: string): Promise<boolean> => {
  const existingUser = await airDB(tableName)
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (existingUser && existingUser[0]) {
    return true;
  }

  return false;
};

export default isExist;

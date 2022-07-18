import airDB from 'services/airtableClient';

const create = async (payload: any) => {
  const { email, firstName } = payload;

  const user = await airDB('users').create([
    {
      fields: {
        email,
        firstName,
      },
    },
  ]);

  return user;
};

export default create;

import Joi from 'joi';

import airDB from 'services/airtableClient';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const checkEmail = async (email: string) => {
  const existingUser = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (existingUser && existingUser[0]) {
    // if not exit
    throw new Error('email_taken');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const logIn = async (payload: unknown) => {
  const { email, password } = await schema.validateAsync(payload);

  await checkEmail(email);

  const loginCallback = await airDB('users').create([
    {
      fields: {
        email,
        password,
      },
    },
  ]);

  return loginCallback;
};

export default logIn;

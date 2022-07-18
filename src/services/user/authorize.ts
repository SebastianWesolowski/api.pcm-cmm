import Joi from 'joi';

import airDB from 'services/airtableClient';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const authorize = async (payload: { email: string; password: string }) => {
  const { email, password } = await schema.validateAsync(payload);

  const [user]: any = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (!user) {
    return null;
  }

  console.log('🚀 ~ file: authorize.ts ~ line 21 ~ authorize ~ user', user);

  //   const passwordHash = crypto
  //     .pbkdf2Sync(password, user.fields.passwordSalt, 1000, 64, `sha512`)
  //     .toString(`hex`);

  //   if (passwordHash !== user.fields.passwordHash) {
  //     return null;
  //   }
  if (password !== user.fields.firstPassword) {
    return null;
  }

  return {
    uniqueID: user.uniqueID,
    email: user.fields.email,
    firstName: user.fields.firstName,
    lastName: user.fields.lastName,
    role: user.fields.role,
  };
};

export default authorize;

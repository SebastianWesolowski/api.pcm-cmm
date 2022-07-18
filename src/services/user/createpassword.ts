// import crypto from 'crypto';

import Joi from 'joi';

import airDB from 'services/airtableClient';
// import { IFormSignInValues } from 'types/FormSignIn';

const schema = Joi.object({
  gender: Joi.string()
    .valid('Prefer not to disclose', 'Woman', 'Man', 'Non-binary or Gender diverse')
    .required(),
  title: Joi.string().valid('Dr./PhD', 'Professor', 'Other').required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  affiliation: Joi.string().min(2).max(200).required(),
  keyword_1: Joi.string().empty('').min(2).max(32),
  keyword_2: Joi.string().empty('').min(2).max(32),
  keyword_3: Joi.string().empty('').min(2).max(32),
  keyword_4: Joi.string().empty('').min(2).max(32),
  privacyPolicy: Joi.boolean().required(),
  // password: Joi.string().required(),
});

const checkEmail = async (email: string) => {
  const existingUser = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (existingUser && existingUser[0]) {
    throw new Error('email_taken');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const create = async (payload: unknown) => {
  const {
    gender,
    title,
    firstName,
    lastName,
    email,
    affiliation,
    keyword_1,
    keyword_2,
    keyword_3,
    keyword_4,
    privacyPolicy,
    // password,
  } = await schema.validateAsync(payload);

  await checkEmail(email);

  // const passwordSalt = crypto.randomBytes(16).toString('hex');
  // const passwordHash = crypto
  //   .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
  //   .toString(`hex`);

  const user = await airDB('users').create([
    {
      fields: {
        gender,
        title,
        firstName,
        lastName,
        email,
        affiliation,
        keyword_1,
        keyword_2,
        keyword_3,
        keyword_4,
        privacyPolicy,
        // passwordSalt,
        // passwordHash,
        role: 'regular',
      },
    },
  ]);

  return user;

  // const validatedOffer = await schema.validateAsync(payload);
  // const offer = await airDB('offers').create([
  //   {
  //     fields: {
  //       ...validatedOffer,
  //     },
  //   },
  // ]);
  // return offer;
};

export default create;

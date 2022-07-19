import generator from 'generate-password';
import Joi from 'joi';

import airDB from 'services/airtableClient';
import { endPointGetResponse } from 'services/apiEndpoint';
import getResponseAxiosInstance from 'services/getResponseClient';

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
});

const checkEmail = async (email: string): Promise<string | void> => {
  const existingUser = await airDB('users')
    .select({ filterByFormula: `email="${email}"` })
    .firstPage();

  if (existingUser && existingUser[0]) {
    return 'email_taken';
  }
  return;
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
  } = await schema.validateAsync(payload);

  const isAvalibleEmail = await checkEmail(email);
  if (isAvalibleEmail === 'email_taken') {
    return 'email_taken';
  }

  const firstPassword = generator.generate({
    length: 10,
    numbers: true,
  });

  const uniqueID = generator.generate({
    length: 5,
    numbers: true,
  });

  console.log('🚀 ~ file: createUser.ts ~ line 56 ~ create ~ firstPassword', firstPassword);

  const user = await airDB('users').create([
    {
      fields: {
        gender,
        title,
        firstName,
        lastName,
        email,
        firstPassword,
        uniqueID,
        affiliation,
        keyword_1,
        keyword_2,
        keyword_3,
        keyword_4,
        privacyPolicy,
        role: 'regular',
      },
    },
  ]);

  console.log('🚀 ~ file: createUser.ts ~ line 76 ~ create ~ user', user);

  try {
    const emailLead = await getResponseAxiosInstance.post(endPointGetResponse.baseUrl.contacts, {
      name: `${firstName} ${lastName}`,
      campaign: {
        campaignId: endPointGetResponse.auth.campaignId.user,
      },
      customFieldValues: [
        {
          customFieldId: 'pkNggD',
          value: [firstPassword],
        },
      ],
      email: email,
    });

    console.log('🚀 ~ file: createUser.ts ~ line 84 ~ create ~ emailLead', emailLead);
  } catch (error) {
    console.log('🚀 ~ file: createUser.ts ~ line 97 ~ create ~ message', error);
  }
  console.log('🚀 ~ file: createUser.ts ~ line 100 ~ create ~ message');

  return user;
};

export default create;

import Joi from 'joi';

import airDB from 'services/airtableClient';
import { IFormSignInValues } from 'types/FormSignIn';

const schema = Joi.object({
  gender: Joi.string()
    .valid('Prefer not to disclose', 'Woman', 'Man', 'Non-binary or Gender diverse')
    .required(),
  title: Joi.string().valid('Dr./PhD', 'Professor', 'Other').required(),
  firstName: Joi.string().min(2).max(64).required(),
  lastName: Joi.string().min(2).max(64).required(),
  email: Joi.string().required(),
  affiliation: Joi.string().min(2).max(200).required(),
  topic: Joi.string().min(2).max(64).required(),
  description: Joi.string().min(2).max(2000).required(),
  keyword_1: Joi.string().empty('').min(2).max(32),
  keyword_2: Joi.string().empty('').min(2).max(32),
  keyword_3: Joi.string().empty('').min(2).max(32),
  keyword_4: Joi.string().empty('').min(2).max(32),
  privacyPolicy: Joi.boolean().required(),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const create = async (payload: IFormSignInValues) => {
  const validatedOffer = await schema.validateAsync(payload);
  const offer = await airDB('offers').create([
    {
      fields: {
        ...validatedOffer,
      },
    },
  ]);
  return offer;
};

export default create;

import Joi from 'joi';

import { endPointGetResponse } from 'services/apiEndpoint';
import getResponseAxiosInstance from 'services/getResponseClient';
import { IFormMiniSymposiumGetResponseValues } from 'types/FormSignIn';

const schema = Joi.object({
  firstName: Joi.string().min(2).max(64).required(),
  lastName: Joi.string().min(2).max(64).required(),
  email: Joi.string().required(),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const create = async (payload: IFormMiniSymposiumGetResponseValues) => {
  const validatedEmailLead = await schema.validateAsync(payload);
  const emailLead = await getResponseAxiosInstance.post(endPointGetResponse.baseUrl.contacts, {
    name: `${validatedEmailLead.firstName} ${validatedEmailLead.lastName}`,
    campaign: {
      campaignId: endPointGetResponse.auth.campaignId.minisymposium,
    },
    email: validatedEmailLead.email,
  });

  return emailLead.status;
};

export default create;

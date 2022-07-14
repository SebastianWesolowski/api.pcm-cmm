import axios from 'axios';

import { endPointGetResponse } from 'services/apiEndpoint';

const getResponseAxiosInstance = axios.create({
  baseURL: endPointGetResponse.baseUrl.contacts,
  headers: {
    'X-Auth-Token': `api-key ${endPointGetResponse.auth.apiKey}`,
    'Content-Type': 'application/json',
  },
});

export default getResponseAxiosInstance;

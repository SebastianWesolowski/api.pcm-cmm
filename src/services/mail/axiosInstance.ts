import axios from 'axios';

import { endPointAirTable, endPointGetResponse } from 'services/apiEndpoint';

export const airTableAxiosInstance = axios.create({
  baseURL: endPointAirTable.baseUrl.minisymposium,
  timeout: 10000,
  headers: {
    Accept: '*/*',
    authorization: `Bearer ${endPointAirTable.auth.apiKey}`,
    'content-type': 'application/json',
    'x-airtable-application-id': `${endPointAirTable.auth.base}`,
    'x-airtable-user-agent': 'Airtable.js/0.11.3',
    'x-api-version': '0.1.0',
  },
});

export const getResponseAxiosInstance = axios.create({
  baseURL: endPointGetResponse.baseUrl.contacts,
  headers: {
    'X-Auth-Token': `api-key ${endPointGetResponse.auth.apiKey}`,
    'Content-Type': 'application/json',
  },
});

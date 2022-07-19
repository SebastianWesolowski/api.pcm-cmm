import axios from 'axios';

import { endPointAirTable } from 'services/apiEndpoint';

export const axiosInstanceAirTable = axios.create({
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

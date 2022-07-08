let PROD_AIR_TABLE_API_KEY;
let PROD_AIR_TABLE_BASE;
let PROD_GET_RESPONSE_API;
let PROD_GET_RESPONSE_CAMPAIGN_ID;
let AIR_TABLE_API_KEY;
let AIR_TABLE_BASE;
let GET_RESPONSE_API;
let GET_RESPONSE_CAMPAIGN_ID;

if (
  process.env.PROD_AIR_TABLE_API_KEY ||
  process.env.PROD_AIR_TABLE_BASE ||
  process.env.PROD_GET_RESPONSE_API ||
  process.env.PROD_GET_RESPONSE_CAMPAIGN_ID
) {
  PROD_AIR_TABLE_API_KEY = String(process.env.PROD_AIR_TABLE_API_KEY);
  PROD_AIR_TABLE_BASE = String(process.env.PROD_AIR_TABLE_BASE);
  PROD_GET_RESPONSE_API = String(process.env.PROD_GET_RESPONSE_API);
  PROD_GET_RESPONSE_CAMPAIGN_ID = String(process.env.PROD_GET_RESPONSE_CAMPAIGN_ID);
} else {
  throw new Error(
    'PROD_AIR_TABLE_API_KEY or PROD_AIR_TABLE_BASE or PROD_GET_RESPONSE_API or PROD_GET_RESPONSE_CAMPAIGN_ID environment variable is not set'
  );
}

if (
  process.env.AIR_TABLE_API_KEY ||
  process.env.AIR_TABLE_BASE ||
  process.env.GET_RESPONSE_API ||
  process.env.GET_RESPONSE_CAMPAIGN_ID
) {
  AIR_TABLE_API_KEY = String(process.env.AIR_TABLE_API_KEY);
  AIR_TABLE_BASE = String(process.env.AIR_TABLE_BASE);
  GET_RESPONSE_API = String(process.env.GET_RESPONSE_API);
  GET_RESPONSE_CAMPAIGN_ID = String(process.env.GET_RESPONSE_CAMPAIGN_ID);
} else {
  throw new Error(
    'AIR_TABLE_API_KEY or AIR_TABLE_BASE or GET_RESPONSE_API or GET_RESPONSE_CAMPAIGN_ID environment variable is not set'
  );
}

export let endPointAirTable = {
  baseUrl: {
    api: 'https://api.airtable.com/v0',
    minisymposium: '',
  },
  table: {
    minisymposium: 'Minisymposium/',
  },
  auth: {
    apiKey: '',
    base: '',
  },
};

export let endPointGetResponse = {
  baseUrl: {
    api: 'https://api.getresponse.com/v3',
    contacts: '',
  },
  auth: {
    apiKey: '',
    campaignId: '',
  },
};

export const airTableAuth =
  process.env.NODE_ENV === 'production'
    ? { apiKey: PROD_AIR_TABLE_API_KEY, base: PROD_AIR_TABLE_BASE }
    : { apiKey: AIR_TABLE_API_KEY, base: AIR_TABLE_BASE };

export const getResponseAuth =
  process.env.NODE_ENV === 'production'
    ? {
        apiKey: PROD_GET_RESPONSE_API,
        campaignId: PROD_GET_RESPONSE_CAMPAIGN_ID,
      }
    : { apiKey: GET_RESPONSE_API, campaignId: GET_RESPONSE_CAMPAIGN_ID };

endPointAirTable.auth.apiKey = airTableAuth.apiKey;
endPointAirTable.auth.base = airTableAuth.base;

endPointGetResponse.auth.apiKey = getResponseAuth.apiKey;
endPointGetResponse.auth.campaignId = getResponseAuth.campaignId;

const airTableMinisymposium = `${endPointAirTable.baseUrl.api}/${endPointAirTable.auth.base}/${endPointAirTable.table.minisymposium}`;
const getResponseContacts = `${endPointGetResponse.baseUrl.api}/contacts`;

endPointAirTable.baseUrl.minisymposium = airTableMinisymposium;
endPointGetResponse.baseUrl.contacts = getResponseContacts;

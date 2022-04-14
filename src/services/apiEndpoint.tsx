const PROD_AIR_TABLE_API_KEY = String(process.env.REACT_APP_PROD_AIR_TABLE_API_KEY);
const PROD_AIR_TABLE_BASE = String(process.env.REACT_APP_PROD_AIR_TABLE_BASE);
const PROD_GET_RESPONSE_API = String(process.env.REACT_APP_PROD_GET_RESPONSE_API);
const PROD_GET_RESPONSE_CAMPAIGN_ID = String(process.env.REACT_APP_PROD_GET_RESPONSE_CAMPAIGN_ID);

const AIR_TABLE_API_KEY = String(process.env.REACT_APP_AIR_TABLE_API_KEY);
const AIR_TABLE_BASE = String(process.env.REACT_APP_AIR_TABLE_BASE);

const GET_RESPONSE_API = String(process.env.REACT_APP_GET_RESPONSE_API);

const GET_RESPONSE_CAMPAIGN_ID = String(process.env.REACT_APP_GET_RESPONSE_CAMPAIGN_ID);

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

// export const fireBaseURL =
//   "https://darmowewebinary-default-rtdb.europe-west1.firebasedatabase.app";
// export const blogBaseURL = "https://blog.darmowewebinary.pl/wp-json/wp/v2/";
// export const endPoint = {
//   categories: "/categories/",
//   logout: "/api/logout/",
//   login: "/api/login/",
//   facebookAuth: "/social-login/facebook/",
//   googleAuth: "/social-login/google/",
//   googleAuthLocal: "/social-login/google-local/",
//   linkedInAuth: "/social-login/linkedin/",
//   authRefresh: "/auth/token/refresh/",
//   webinars: "/webinars/",
//   user: "/user/",
//   join: "/join/",
//   leave: "/leave/",
//   register: "/auth/registration/",
//   verifyingEmail: "/auth/registration/verify-email/",
//   checkUserEmail: "/check-email-username/",
//   newsletter: "/newsletter/",
//   stream: {
//     webinarToken: "/webinar-token/",
//     videoId: "/video-id/",
//     start: "/start-stream/",
//     stop: "/stop-stream/",
//   },
//   chat: {
//     message: "/send-chat-message/",
//     chat: "/chat/public",
//   },
//   blog: {
//     post: "/posts",
//   },
// };

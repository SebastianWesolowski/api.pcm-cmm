import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { withSentry } from 'helpers/monitoring/sentry';
import { endPointAirTable } from 'services/apiEndpoint';
// import createUser from 'services/user/createUser';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Method GET not allowed - api/user/register',
    });
  })
  .post(async (req, res) => {
    const instance = axios.create({
      baseURL: endPointAirTable.baseUrl.users,
      timeout: 1000,
      headers: {
        Accept: '*/*',
        authorization: `Bearer ${endPointAirTable.auth.apiKey}`,
        'content-type': 'application/json',
        'x-airtable-application-id': `${endPointAirTable.auth.base}`,
        'x-airtable-user-agent': 'Airtable.js/0.11.3',
        'x-api-version': '0.1.0',
      },
    });

    instance
      .post(endPointAirTable.baseUrl.minisymposium + '?', {
        fields: { ...req.body },
      })
      .then((response) => {
        res.status(201).json({ status: `${req.body.email} is`, response });
      })
      .catch((error) => {
        res.status(201).json({ status: `email is not`, error });
      });

    // {
    //   baseURL: endPointAirTable.baseUrl.minisymposium,
    //   timeout: 10000,
    //   headers: {
    //     Accept: '*/*',
    //     authorization: `Bearer ${endPointAirTable.auth.apiKey}`,
    //     'content-type': 'application/json',
    //     'x-airtable-application-id': `${endPointAirTable.auth.base}`,
    //     'x-airtable-user-agent': 'Airtable.js/0.11.3',
    //     'x-api-version': '0.1.0',
    //   },
    // }
  });

// create a handler from router with custom
// onError and onNoMatch
export default withSentry(
  router.handler({
    onError: (err: any, _req: NextApiRequest, res: NextApiResponse<any>) => {
      console.error(err.stack);
      res.status(500).end(`Something broke - ${err.message}`);
    },
    onNoMatch: (_req, res) => {
      res.status(404).end('Page is not found');
    },
  })
);

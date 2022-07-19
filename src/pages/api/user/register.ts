import { withSentry } from '@sentry/nextjs/types/utils/withSentry';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import createUser from 'services/user/createUser';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(async (_req, _res, next) => {
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .get(async (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Method GET not allowed - api/user/register',
    });
  })
  .post(async (req, res) => {
    // use async/await
    const payload = req.body;
    const newUser = await createUser(payload);
    if (newUser === 'email_taken') {
      res.status(207).json({ status: 'Conflict on AirTable', email: payload.email });
    } else {
      res.status(201).json({ status: 'created', newUser, payload });
    }
  });

// const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {

//   const { method } = req;

//   if (req.method === 'GET') {
//     res.status(200).json({
//       success: true,
//       message: 'Method GET not allowed - api/user/register',
//     });
//     res.end();
//   } else if (method === 'POST') {
//     try {
//       const payload = req.body;
//       const newUser = await createUser(payload);
//       res.status(201).json({ status: 'created', newUser, payload });
//       res.end();
//     } catch ({ message }) {
//       if (message === 'email_taken') {
//         const payload = req.body;
//         res.status(207).json({ status: 'Conflict on AirTable', email: payload.email });
//         res.end();
//       } else {
//         res.status(422).json({ status: 'not_created', message });
//         res.end();
//       }
//     }
//   } else if (req.query.error) {
//     throw new Error('Sentry API error test');
//   } else {
//     res.status(405).json({ status: 'Method not allowed' });
//     res.end();
//   }
// };

// export default withSentry(handler);

// export default withSentry)router.handler({
//   onError: (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).end("Something broke!");
//   },
//   onNoMatch: (req, res) => {
//     res.status(404).end("Page is not found");
//   },
// }));

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

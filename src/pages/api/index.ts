import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  try {
    res.json({ message: 'ok' });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

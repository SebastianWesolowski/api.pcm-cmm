import { NextApiResponse } from 'next';

const api = async (res: NextApiResponse): Promise<void> => {
  try {
    res.json({ message: 'ok' });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
};

export default api;

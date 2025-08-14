// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const REPLIT_BACKEND = "https://af3c07d4-752f-4485-9b15-c19e3145c10b-00-2yfziis2nbhf0.riker.replit.dev";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Forward the request to your Replit backend
    const url = `${REPLIT_BACKEND}${req.url}`;
    const options: any = {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined // remove 'host' header to avoid CORS issues
      }
    };

    if (req.method !== 'GET' && req.body) {
      options.body = JSON.stringify(req.body);
      options.headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, options);
    const data = await response.text();

    res.status(response.status).send(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

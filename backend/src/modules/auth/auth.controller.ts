import { Controller, All, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { auth } from '../../lib/auth';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  @All('*')
  async handleAuth(@Req() req: Request, @Res() res: Response) {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    // ✅ Typage explicite des headers (Express → Fetch)
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') headers.append(key, value);
      else if (Array.isArray(value))
        value.forEach((v) => headers.append(key, v));
    }

    // ✅ Gestion du corps (pas de any)
    const body =
      req.method !== 'GET' && req.method !== 'HEAD'
        ? typeof req.body === 'string'
          ? req.body
          : JSON.stringify(req.body)
        : undefined;

    // ✅ Création du vrai Fetch Request
    const fetchRequest = new Request(url, {
      method: req.method,
      headers,
      body,
    });

    const fetchResponse = await auth.handler(fetchRequest);
    const responseText = await fetchResponse.text();

    // ✅ Réponse Express
    res.status(fetchResponse.status);
    fetchResponse.headers.forEach((value, key) => res.setHeader(key, value));
    res.send(responseText);
  }
}

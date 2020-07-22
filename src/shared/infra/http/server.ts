import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';

import '@shared/container';
import '../typeorm';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();
app.use(cors());
app.use(express.static(uploadConfig.uploadsFolder));
app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        error: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      error: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});

'use strict';

import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: Request, response: Response) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .send({
      message,
      status,
    });
}

export default errorMiddleware;

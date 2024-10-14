import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import HttpBusinessError from '../lib/errors/HttpBusinessError';

const schemaValidator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const msg = `${
          error.issues[0].message
        } - ${error.issues[0].path[1].toString()}`;
        throw new HttpBusinessError(msg, 400, 'validation');
      }
    }
  };

export default schemaValidator;

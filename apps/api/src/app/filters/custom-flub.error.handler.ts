import { FlubErrorHandler } from 'nestjs-flub';
import { ArgumentsHost, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {Response} from 'express';
import * as process from 'node:process';
/**
 * This setup ensures that in development, you get the default HTML error page,
 * while in production, you receive a clean JSON response without exposing sensitive information like stack traces.
 * */


/**
 * Custom error handler extending FlubErrorHandler to provide different
 * error responses based on the environment. In development, it returns
 * a JSON response with error details, while in production, it delegates
 * to the default Flub behavior, which provides an HTML error page.
 * This approach ensures sensitive information like stack traces are not
 * exposed in production.
 *
 * @param exception - The error object caught during request processing.
 * @param host - The arguments host containing request and response objects.
 * @returns A JSON response in development or the default Flub HTML response in production.
 */
@Injectable()
export class CustomFlubErrorHandler extends FlubErrorHandler {
  catch(exception: Error, host: ArgumentsHost) {

    const context = host.switchToHttp();
    const response = context.getResponse<Response>()
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    const message = exception instanceof HttpException
      ? exception.getStatus() : 'Internal Server Error';

    const stack = process.env.NODE_ENV !== 'production' ? null: exception instanceof Error
    ? exception.stack : null;

    if (process.env.NODE_ENV !== 'production') {
      return response.status(status).json({
        message: message,
        success:false,
        statusCode: status,
        date : new Date().toISOString(),
      })
    } else {
      return  super.catch(exception, host); // default Flub behavior (HTML response)
    }
  }
}

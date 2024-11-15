import { FlubErrorHandler } from 'nestjs-flub';
import { ArgumentsHost, HttpException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as process from 'node:process';

@Injectable()
export class PrettyHttpErrorDisplay extends FlubErrorHandler {
  constructor(private readonly serviceName: string) {
    super();
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal Server Error';

    const stack = process.env.NODE_ENV !== "production" && exception instanceof Error
      ? exception.stack
      : null;

    // Custom JSON response with `where` field to specify the service name
    const errorResponse = {
      statusCode: status,
      message: typeof message === 'string' ? message : (message as any)["message"] || 'An error occurred',
      success: false,
      date: new Date().toISOString(),
      where: this.serviceName,
      ...(stack && { stack }),
    };

    return response.status(status).json(errorResponse);
  }
}

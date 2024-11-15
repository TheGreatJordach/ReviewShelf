import { PinoLogger } from 'nestjs-pino';
import { HttpException } from '@nestjs/common';

/**
 * FIXING Error 1: TS2339
 * Error 1: TS2339: Property 'logger' does not exist on type 'PropertyDescriptor'.
 * In this error, you're trying to access 'this.logger', but TypeScript doesn't
 * know that the 'this' inside the decorator function has a 'logger' property.
 * The 'this' inside the method decorator is of type 'unknown' and doesn't
 * include any properties like 'logger'.
 *
 * Solution:
 * To fix this error, you need to tell TypeScript that the class that uses
 * this decorator will have a 'logger' property. You can do this by typing
 * the target parameter in the decorator as the class instance that
 * has the 'logger'.
 */
export function HandleError(serviceName: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]): Promise<{ error: Error | null, result: any }> {

      // Use context instead of name for PinoLogger
      // Cast `this` to Loggable, so we can access `logger`
      const logger = target.logger || new PinoLogger({ renameContext: serviceName });  // Passing context to PinoLogger

      try {
        const result = await originalMethod.apply(this, args);
        return { error: null, result };
      } catch (error:unknown) {

        // Only cast to Error if the error is an instance of Error
        const typedError = error instanceof Error ? error : new Error('Unknown error');

        // Handle specific error types differently
        if (error instanceof HttpException) {
          logger.warn(error, `Specific error occurred in method ${propertyKey}`);
        } else {
          // Log the error automatically using NestJS-Pino
          logger.error(error, `Error occurred in method ${propertyKey}`);
        }

        // Return error to be handled later
        return { error:typedError , result: null };
      }
    }
  };
}


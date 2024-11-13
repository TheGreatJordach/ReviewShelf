import { PinoLogger } from 'nestjs-pino';
import { HttpException } from '@nestjs/common';


export function HandleError(serviceName: string) {
  return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]): Promise<{ error: Error | null, result: any }> {

      // Use context instead of name for PinoLogger
      const logger = this.logger || new PinoLogger({ renameContext: serviceName });  // Passing context to PinoLogger

      try {
        const result = await originalMethod.apply(this, args);
        return { error: null, result };
      } catch (error) {
        // Handle specific error types differently
        if (error instanceof HttpException) {
          logger.warn(error, `Specific error occurred in method ${propertyKey}`);
        } else {
          // Log the error automatically using NestJS-Pino
          logger.error(error, `Error occurred in method ${propertyKey}`);
        }

        // Return error to be handled later
        return { error, result: null };
      }
    }
  };
}

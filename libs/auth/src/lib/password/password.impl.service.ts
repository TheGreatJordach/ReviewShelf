import { BcryptImplService } from './hash/bcrypt.impl.service';
import { PasswordAbstractService } from './password.abstract.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';


/**
 * Service for handling password operations, extending the abstract password service.
 * Utilizes the Bcrypt implementation for hashing and comparing passwords.
 *
 * @constructor
 * @param bcrypt - Instance of BcryptImplService for hashing operations.
 * @param logger - Instance of PinoLogger for logging errors and information.
 */
@Injectable()
export class PasswordImplService extends PasswordAbstractService {
  // No need to declare a separate 'bcrypt' property, use the inherited 'hashAlgo' directly
  constructor(bcrypt: BcryptImplService, private readonly logger: PinoLogger) {
    super(bcrypt); // Pass bcrypt to the parent class, which will assign it to 'hashAlgo'
  }


  /**
   * Compares the provided data with the encrypted string using the inherited hash algorithm.
   *
   * @param data - The data to be compared, which can be a string or a Buffer.
   * @param encrypted - The encrypted string to compare against.
   * @returns A promise that resolves to a boolean indicating whether the data matches the encrypted string.
   * @throws HttpException if either the data or encrypted input is null or undefined.
   */
  override async comparePassword(
    data: string | Buffer,
    encrypted: string
  ): Promise<boolean> {
    if (data == null || encrypted == null) {
      this.logger.fatal(
        'Compare Password Failed - data and encrypted values must not be null or undefined'
      );
      throw new HttpException(
        {
          errorType: 'InvalidInput',
          where: 'PasswordImplService',
          message: 'Data to compare password must not be null or undefined',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return this.hashAlgo.compare(data, encrypted); // Use inherited hashAlgo
  }

  /**
   * Hashes the provided data using the inherited hash algorithm.
   *
   * @param data - The data to be hashed, which can be a string or a Buffer.
   * @returns A promise that resolves to the hashed string.
   * @throws HttpException if the input data is null or undefined.
   */
  override async hashPassword(data: string | Buffer): Promise<string> {
    if (data == null) {
      this.logger.fatal('Hashing failed: Input data is null or undefined');
      throw new HttpException(
        {
          errorType: 'InvalidInput',
          where: 'PasswordImplService',
          message: 'Data to hash must not be null or undefined',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return this.hashAlgo.hash(data); // Use inherited hashAlgo
  }
}

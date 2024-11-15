import { IHashAlgo } from './hash.interface';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { PinoLogger } from 'nestjs-pino';
import { HandleError } from '@review-shelf-1.0.0/decorators';

@Injectable()
export class BcryptImplService implements IHashAlgo{

  saltRound:number;

  /**
   * Constructs a new instance of BcryptImplService.
   *
   * @param configService - Injected ConfigService to access configuration variables.
   * @param logger - Injected PinoLogger for logging purposes.
   *
   * @throws HttpException - Throws an exception if the "SALT_ROUND" environment variable
   *                         fails validation or is not found.
   */
  constructor(private readonly configService:ConfigService,private readonly logger: PinoLogger) {
    // handles errors gracefully
    try{
      this.saltRound = configService.getOrThrow<number>("SALT_ROUND");
    } catch (error) {
      throw new HttpException({
        where: "hashImplementation",
        why : " env variable failed validation",
        data: null,
        error : error,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  /**
   * Compares a plaintext password or data with an encrypted password/hash using bcrypt.
   * This method is decorated with the `HandleError` decorator for centralized error handling
   * and logging using `nestjs-pino`.
   *
   * @param {string | Buffer} data - The plaintext password or data to be compared.
   * @param {string} encrypted - The previously hashed password (encrypted) to be compared against.
   *
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the plaintext
   *                             data matches the encrypted hash (`true` if they match, `false` otherwise).
   *
   * @throws {HttpException} Throws an exception if the bcrypt comparison fails, which will be handled
   *                         and logged by the `HandleError` decorator.
   *
   * @description
   * The method uses the `bcrypt.compare` function to safely compare the provided plaintext data with
   * the hashed version. If any error occurs during comparison, the error will be logged via `nestjs-pino`,
   * and the exception will be handled by the decorator.
   */
   @HandleError(BcryptImplService.name)
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(data,encrypted);
  }

  /**
   * Hashes the given data (typically a password) using bcrypt and a dynamically configured salt round.
   * This method is decorated with the `HandleError` decorator for centralized error handling
   * and logging using `nestjs-pino`.
   *
   * @param {string | Buffer} data - The data to be hashed (typically a password).
   *
   * @returns {Promise<string>} A promise that resolves to the hashed value of the input data.
   *
   * @throws {HttpException} Throws an exception if the bcrypt hashing process fails, which will be handled
   *                         and logged by the `HandleError` decorator.
   *
   * @description
   * The method uses `bcrypt.hash` to hash the input data with a salt generated based on the `saltRound`
   * property, which is retrieved from the environment configuration. The method ensures that the `saltRound`
   * is a valid number before proceeding with hashing. Any errors during the hashing process are caught and
   * logged by the decorator.
   */
  @HandleError(BcryptImplService.name)
  async hash(data: string | Buffer): Promise<string> {
    const saltRound = bcrypt.genSaltSync(this.saltRound);
    return await bcrypt.hash(data,saltRound);
  }
}

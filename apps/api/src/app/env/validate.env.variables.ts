import { IsInt, IsNotEmpty, IsPositive, IsString, IsStrongPassword, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';




/**
 * ValidateEnvVariables is a class that defines the structure and validation rules
 * for environment variables related to the data source configuration.
 *
 * Properties:
 * - DATASOURCE_USERNAME: A non-empty string representing the username for the data source.
 * - DATASOURCE_PASSWORD: A strong password string for the data source.
 * - DATASOURCE_DATABASE: A non-empty string indicating the database name.
 * - DATASOURCE_HOST: A non-empty string specifying the host address of the data source.
 * - DATASOURCE_PORT: A positive integer representing the port number for the data source.
 * - SALT_ROUND : A positive integer representing the salt used for Bcrypt Implementation.
 * The class uses decorators from 'class-validator' to enforce validation rules.
 */
export class ValidateEnvVariables {

  @IsString()
  @IsNotEmpty()
  DATASOURCE_USERNAME:string
  @IsString()
  @IsStrongPassword()
  DATASOURCE_PASSWORD:string
  @IsString()
  @IsNotEmpty()
  DATASOURCE_DATABASE:string
  @IsString()
  @IsNotEmpty()
  DATASOURCE_HOST:string
  @IsInt()
  @IsPositive()
  DATASOURCE_PORT:number

  @IsInt()
  @IsPositive()
  SALT_ROUND:number

  }


/**
 * Represents a type that includes all the keys of the `ValidateEnvVariables` class.
 * This is used to ensure type safety when accessing properties of `ValidateEnvVariables`.
 */
type envValidationKeys = keyof ValidateEnvVariables;


/**
 * Formats validation errors into a list of readable messages.
 *
 * @param errors - An array of ValidationError objects to be formatted.
 * @returns An array of strings, each representing a formatted error message
 *          with the property name and the corresponding validation message.
 */
function formatValidationErrors(errors: ValidationError[]): string[] {
  const returnedMessages: string[]= []
  errors.forEach(error => {
    if(error.constraints){
      for (const [constraint, message] of Object.values(error.constraints)) {
        returnedMessages.push(`${error.property} : ${message}`);
      }
    }
  })
  return returnedMessages;
}


/**
 * Validates the results of environment variable validation by checking each property
 * against the list of validation errors. Returns an array of validation results and
 * formatted error messages.
 *
 * @param validated - An instance of ValidateEnvVariables containing the environment variables.
 * @param errors - An array of ValidationError objects representing validation errors.
 * @returns An array of strings indicating the validation status of each property and any error messages.
 */
function validateResults(validated: ValidateEnvVariables, errors: ValidationError[]) {
  const validResults : string[]=[]
  const errorMessages = formatValidationErrors(errors)

  // Use the keyof operator for better type safety
  const properties: envValidationKeys[] = [
    'DATASOURCE_USERNAME',
    'DATASOURCE_PASSWORD',
    'DATASOURCE_DATABASE',
    'DATASOURCE_HOST',
    'DATASOURCE_PORT',
    'SALT_ROUND',
  ];

  properties.forEach((property) => {
    const isValid = errors.every(error => error.property !== property);
    validResults.push(`${property}: ${isValid ? "OK" : "Invalid"}`);
  });

  return [...validResults, ...errorMessages];

}



/**
 * Validates and loads environment variables into a strongly-typed object.
 *
 * @param envs - A record of environment variables to be validated.
 * @param processResult - A function to process validation results, defaults to `validateResults`.
 * @returns A `ValidateEnvVariables` instance containing validated environment variables.
 * @throws {HttpException} If any environment variable fails validation, an exception is thrown with details.
 */

export function loadValidatedEnv(
  envs:Record<string, unknown>,
  processResult: typeof validateResults = validateResults
) {
  const validEnvs :ValidateEnvVariables = plainToInstance(ValidateEnvVariables,envs, {
    enableImplicitConversion:true
  })

  const errors = validateSync(validEnvs,{
    skipMissingProperties:false
  })

  // Create an array to store messages
  const validationResults : string[] = processResult(validEnvs,errors)

  if (errors.length > 0) {
    const errorMessage = `${errors.length} variable(s) failed validation:\n${validationResults.join('\n')}`;

    // TODO Log the error once without rethrowing it as a log
    console.error(errorMessage);

    // Throw HttpException without duplicating the log
    throw new HttpException(
      {
        errorType: 'configErr',
        where: 'ValidateEnvVariables',
        date: new Date().toISOString(),
        data: null,
        message: "Environment validation failed",
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }



  // If there are no errors, return the validated environment
  return validEnvs;
}

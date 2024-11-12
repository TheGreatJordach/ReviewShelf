import { IsInt, IsNotEmpty, IsPositive, IsString, IsStrongPassword, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { error } from '@angular/compiler-cli/src/transformers/util';

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
}

type envValidationKeys = keyof ValidateEnvVariables;

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
  ];

  properties.forEach((property) => {
    const isValid = errors.every(error => error.property !== property);
    validResults.push(`${property}: ${isValid ? "OK" : "Invalid"}`);
  });

  return [...validResults, ...errorMessages];

}


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

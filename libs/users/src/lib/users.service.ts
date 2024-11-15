import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser, RegistrationDto, UpdateUserDto, verifyEmail } from '@review-shelf-1.0.0/common';
import { IUserAuthService } from '@review-shelf-1.0.0/auth';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { EUser } from './entity/user.entity';
import { validate } from 'class-validator';
import { IUserFeatures } from './interfaces/user.crud.feature.interface';

@Injectable()
export class UsersService implements IUserAuthService, IUserFeatures{

  constructor(private readonly dataSource:DataSource,
              private readonly logging: PinoLogger) {}


  async createUserProfile(userDto: RegistrationDto): Promise<EUser | null> {
    return this.dataSource.transaction<EUser | null>(async (transactionEntity) => {
      try {

        //validate input data
        await this.validateUserDto(userDto);

        const userRepo: Repository<EUser> = transactionEntity.getRepository(EUser);
        const newUser: EUser = userRepo.create(userDto);

        // Save the user
        const savedUser: EUser = await userRepo.save(newUser);

        if (!savedUser) {
          throw new Error("User creation failed: No user returned from the database")
        }

        return savedUser;
      } catch (error) {
        this.handleTransactionError(error, 'createUserProfile');
      }
    });
  }

  private async validateUserDto(userDto: RegistrationDto): Promise<void> {
    const errors = await validate(userDto);
    if (errors.length > 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorType: 'Validation Error',
          details: errors.map((e) => Object.values(e.constraints || {})).flat(),
        },
        HttpStatus.BAD_REQUEST,
      );

    }
  }

  private handleTransactionError(error: unknown, operation:string): never {
    this.logging.error(`Transaction Error in ${operation}: ${error instanceof Error ? error.message : error}`);

    if(error instanceof QueryFailedError) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        errorType: 'Database Query Failed',
        operation,
        timestamp: new Date().toISOString(),
        details: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    } else if (error instanceof TypeError) {

      // Handle unexpected issues like null references or API misuse
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errorType: 'Database Connection Error',
          operation,
          timestamp: new Date().toISOString(),
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Generic fallback for unknown errors
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        errorType: 'Unknown Error',
        operation,
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'No error details available',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }



  async findUserByEmail(email: string): Promise<EUser | null> {
    // Step 1: Validate the email before starting the transaction
    const isValidEmail : boolean = verifyEmail(email)
    if (!isValidEmail) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        errorType: 'Database Query Failed',
        timestamp: new Date().toISOString(),
        details: "Invalid email address provided",
      }, HttpStatus.BAD_REQUEST);
    }

    // Step 2: Perform the database transaction
    return await this.dataSource.transaction<EUser | null>( async (transactionEntity) => {

       try {
         // Step 3: Query the database to find the user
         const userRepo = transactionEntity.getRepository(EUser)
         const foundUser = await userRepo.findOne({where: {email: email}});

         // Return the user if found, or null if not
         return foundUser || null
       } catch (error) {

         // Step 4: Handle transaction errors
         this.handleTransactionError(error, 'findUserByEmail')
       }

    } )
  }



  async getUserProfile(id:number) {
    return Promise.resolve({id:id,name:"userInfo", userName:"userInfo"} as IUser)
  }

  async updateUserProfile(id:number,userInfo:UpdateUserDto) {
    return Promise.resolve({id:id,name:userInfo.name, userName:userInfo.userName} as IUser);
  }

  async deleteUserProfile(id:number) {
    this.logging.info(`This Service delete the user profile information with id ${id}`)
  }



}

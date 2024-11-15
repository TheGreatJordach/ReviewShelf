import { BcryptImplService } from './hash/bcrypt.impl.service';
import { PasswordAbstractService } from './password.abstract.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordImplService extends PasswordAbstractService {
  // No need to declare a separate 'bcrypt' property, use the inherited 'hashAlgo' directly
  constructor(bcrypt: BcryptImplService) {
    super(bcrypt); // Pass bcrypt to the parent class, which will assign it to 'hashAlgo'
  }

  // No need to override 'comparePassword' unless custom logic is needed
  override async comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
    if (data == null || encrypted == null) {
      throw new Error('Invalid input: data and encrypted values must not be null or undefined');
    }
    return this.hashAlgo.compare(data, encrypted); // Use inherited hashAlgo
  }

  override async hashPassword(data: string | Buffer): Promise<string> {
    if (data == null) {
      throw new Error('Invalid input: data must not be null or undefined');
    }
    return this.hashAlgo.hash(data); // Use inherited hashAlgo
  }
}

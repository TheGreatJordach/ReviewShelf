import { IHashAlgo } from './hash/hash.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class PasswordAbstractService {
  protected constructor(protected readonly hashAlgo: IHashAlgo) {}

  async comparePassword(data:string | Buffer, encrypted:string) : Promise<boolean> {
   return this.hashAlgo.compare(data, encrypted);

  }

  async hashPassword(data:string | Buffer): Promise<string>{
    return this.hashAlgo.hash(data)
  }

}



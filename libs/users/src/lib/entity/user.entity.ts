import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '@review-shelf-1.0.0/common';


/**
 * Represents a user entity with properties for identification and authentication.
 *
 * @property {number} id - The unique identifier for the user, automatically generated.
 * @property {string} email - The user's email address, must be unique and not null.
 * @property {string} name - The user's name.
 * @property {string} password - The user's password, cannot be null.
 * @property {string} [userName] - An optional username for the user.
 */
@Entity("users")
export class EUser implements IUser {
  @PrimaryGeneratedColumn()
  id!:number;
  @Column({nullable:false, unique:true})
  email!: string;
  @Column()
  name!: string;
  @Column({nullable:false})
  password!: string;
  @Column({nullable:true})
  userName?: string;
}

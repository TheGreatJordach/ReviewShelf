import { Controller, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { FlubErrorHandler } from 'nestjs-flub';

@UseFilters(new FlubErrorHandler({theme:"dark", quote:true}))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
}

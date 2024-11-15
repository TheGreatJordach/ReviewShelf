import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { IdDto, UpdateUserDto } from '@review-shelf-1.0.0/common';
import { logger } from 'nx/src/utils/logger';



//@UseFilters(new FlubErrorHandler({ theme: 'dark', quote: false }))
//@UseFilters(new PrettyHttpErrorDisplay("UserService"))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(":id")
 private getUserProfile(@Param('id') id: number) {
    logger.info(`Will retrieve user with id : ${id}`);
    return this.usersService.getUserProfile(id);
  }

  @Patch(':id')
  private UpdateUserProfile(
    @Param() { id }: IdDto,
    @Body() updateUserDto: UpdateUserDto
  ) {

   logger.info(`UpdateUserProfile  ${JSON.stringify(updateUserDto)}\nUserID : ${id}`);
   return this.usersService.updateUserProfile(id, updateUserDto);
  }

  @Delete(':id')
  private deleteUserProfile(@Param() { id }: IdDto) {
    logger.info(`Will delete user with id : ${id}`);
    return this.usersService.deleteUserProfile(id);
  }
}

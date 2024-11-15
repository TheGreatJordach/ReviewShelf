import { Body, Controller,Post } from '@nestjs/common';
import { AuthImplService } from './auth.impl.service';
import { RegistrationDto } from '@review-shelf-1.0.0/common';


@Controller('iam')
export class AuthController {

  constructor(private readonly authService: AuthImplService) {
  }


  @Post("register")
  register(@Body() registerUser: RegistrationDto) {
    return this.authService.registerUser(registerUser);
  }

}

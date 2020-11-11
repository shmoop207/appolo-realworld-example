import { string } from '@appolo/validator';

export class LoginUser {

  @string().required()
  readonly email: string;

  @string().required()
  readonly password: string;
}




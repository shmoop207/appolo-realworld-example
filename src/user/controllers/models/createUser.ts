import { string } from '@appolo/validator';

export class CreateUser {

  @string().required()
  readonly username: string;

  @string().required()
  readonly email: string;

  @string().required()
  readonly password: string;
}

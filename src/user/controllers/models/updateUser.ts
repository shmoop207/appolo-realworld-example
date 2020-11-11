import { string } from '@appolo/validator';

export class UpdateUser {
  @string().optional()
  readonly username: string;
  @string().optional()
  readonly email: string;
  @string().optional()
  readonly bio: string;
  @string().optional()
  readonly image: string;
}

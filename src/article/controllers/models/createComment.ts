import {string} from "@appolo/validator"

export class CreateComment {
  @string().required()
  readonly body: string;
}

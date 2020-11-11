import {string,array} from "@appolo/validator"

export class UpdateArticle {

  @string().optional()
  readonly title: string;

  @string().optional()
  readonly description: string;

  @string().optional()
  readonly body: string;

}

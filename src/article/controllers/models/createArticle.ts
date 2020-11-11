import {string,array} from "@appolo/validator"

export class CreateArticle {

  @string().required()
  readonly title: string;

  @string().required()
  readonly description: string;

  @string().required()
  readonly body: string;

  @array().items(string()).optional()
  readonly tagList: string[];
}

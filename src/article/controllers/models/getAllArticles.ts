export class GetAllArticles {
  readonly tag?: string;
  readonly author?: string;
  readonly favorited?: string;
  readonly limit?: number;
  readonly offset?: number;
}
export class GetFeedArticles {

  readonly limit?: number;
  readonly offset?: number;
}

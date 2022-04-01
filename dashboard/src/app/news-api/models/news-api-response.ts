import { Article } from './article';

export interface NewsApiResponse {
  totalResults: number;
  articles: Article[];
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiArticleListComponent } from './news-api-article-list/news-api-article-list.component';

@NgModule({
  declarations: [NewsApiArticleListComponent],
  imports: [CommonModule],
  exports: [NewsApiArticleListComponent],
})
export class NewsApiModule {}

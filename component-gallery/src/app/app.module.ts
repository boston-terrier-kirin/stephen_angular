import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollectionsModule } from './collections/collections.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [BrowserModule, CollectionsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * ・AppRoutingModule -> ElementsModule -> CollectionsModule の順でimportした場合
 * 　{ path: ''           ,component: HomeComponent,},
 * 　{ path: '**'         ,component: NotFoundComponent,},
 * 　{ path: 'elements'   ,component: ElementsHomeComponent,}
 * 　{ path: 'collections',component: CollectionsHomeComponent,}
 * 　⇒この順番になるので、elements/colletionsにアクセスしても、notfoundに行ってしまう。
 *
 * ・ElementsModule -> CollectionsModule -> AppRoutingModule の順でimportした場合
 * 　{ path: 'elements'   ,component: ElementsHomeComponent,}
 * 　{ path: 'collections',component: CollectionsHomeComponent,}
 * 　{ path: ''           ,component: HomeComponent,},
 * 　{ path: '**'         ,component: NotFoundComponent,},
 * 　⇒この順番になるので、想定通りの動きになる。
 */

/**
 * lazy loading を使う場合、app.moduleにモジュールのimportは不要になる。
 */

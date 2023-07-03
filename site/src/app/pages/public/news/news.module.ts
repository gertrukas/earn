import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule} from "../../../pipes/pipes.module";
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';

@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    PipesModule
  ]
})

export class NewsModule { }

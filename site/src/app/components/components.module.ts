import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import { AnimationsComponent } from './animations/animations.component';

import { News4Component } from './news4/news4.component';

import { PipesModule} from "../pipes/pipes.module";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AnimationsComponent,
    News4Component
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AnimationsComponent,
    News4Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ]
})
export class ComponentsModule { }

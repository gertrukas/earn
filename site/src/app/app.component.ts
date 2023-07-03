import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  fbImage = "https://earn.com.mx/assets/images/earn.jpeg";

  constructor(
      private primengConfig: PrimeNGConfig,
      private metaService: Meta
      ) {


    this.metaService.updateTag({ property: 'og:url', content: 'https://earn.com.mx' });
      this.metaService.updateTag({ property: 'og:title', content: 'EARN'});
      this.metaService.updateTag({ property: 'og:description', content: 'EARN avaluos'});
      this.metaService.updateTag({ property: 'og:image', content: this.fbImage});
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}

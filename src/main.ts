import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { NavbarComponent } from './app/navbar/navbar.component';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  platformBrowserDynamic().bootstrapModule(NavbarComponent)
  .catch(err => console.error(err));
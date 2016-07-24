import { bootstrap }         from 'angular2/platform/browser';
import { HTTP_PROVIDERS }    from 'angular2/http';
import { TidesAppComponent } from './components/tides-app/tides-app.component';

bootstrap(TidesAppComponent, [ HTTP_PROVIDERS ]);

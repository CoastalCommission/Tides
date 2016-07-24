import { Component,
         OnInit }         from 'angular2/core';
import { Router }         from 'angular2/router';

import { AccessLocation } from '../../services/access/model/access.model';
import { AccessService }  from '../../services/access/access.service';

@Component({
    selector: 'access-location',
    templateUrl: 'app/components/access/access.component.html',
    styleUrls: ['app/components/access/access.component.css'],
    directives: [

    ],
    providers: [
        AccessService
    ]
})

export class AccessComponent implements OnInit  {
    accessLocations: AccessLocation[];
    selectedLocation: AccessLocation;

    constructor(
        private _router: Router,
        private _accessService: AccessService
    ) { }

    getAccessLocations() {
        this._accessService.getAccessLocations()
            .then(accessLocations => this.accessLocations = accessLocations)
            .catch(this._accessService.handleError);
    }

    ngOnInit() {
        this.getAccessLocations();
    }
}

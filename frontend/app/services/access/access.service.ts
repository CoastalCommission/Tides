import { Injectable }     from 'angular2/core';
import { Headers,
         Http }           from 'angular2/http';
         
import 'rxjs/add/operator/toPromise';

import { AccessLocation } from '../../services/access/type/access.type';

@Injectable()

export class AccessService {
    private accessLocationsUrl = 'http://api.coastal.ca.gov/access/v1/locations';  // URL to API

    constructor(private http: Http) { }

    getAccessLocations() {
        return this.http.get(this.accessLocationsUrl)
                        .toPromise()
                        .then(response => response.json().data as AccessLocation[])
                        .catch(this.handleError);
    }

    getAccessLocation(id: number) {
        return this.getAccessLocations()
            .then(accessLocations => accessLocations.find(accessLocation => accessLocation.ID === id));
    }

    saveAccessLocation(accessLocation: AccessLocation): Promise<AccessLocation>  {
        if (accessLocation.ID) {
            return this.put(accessLocation);
        }
        return this.post(accessLocation);
    }

    delete(accessLocation: AccessLocation) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.accessLocationsUrl}/id/${accessLocation.ID}`;
        return this.http
                   .delete(url, {headers: headers})
                   .toPromise()
                   .catch(this.handleError);
    }

    private post(accessLocation: AccessLocation): Promise<AccessLocation> {
        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
                   .post(this.accessLocationsUrl, JSON.stringify(accessLocation), {headers: headers})
                   .toPromise()
                   .then(res => res.json().data)
                   .catch(this.handleError);
    }

    private put(accessLocation: AccessLocation) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.accessLocationsUrl}/id/${accessLocation.ID}`;
        return this.http
                   .put(url, JSON.stringify(accessLocation), {headers: headers})
                   .toPromise()
                   .then(() => accessLocation)
                   .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

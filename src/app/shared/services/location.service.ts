import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocationModel} from '../models/aplicacao/location.model';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private baseUrl = `${environment.apiEndpoint}/ms-company/locations`;

    constructor(private http: HttpClient) { }

    public findAll() {
        return this.http.get<LocationModel[]>(this.baseUrl);
    }

    public create(location: LocationModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl, location, { headers });
    }

    public update(location: LocationModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.put(this.baseUrl, location, { headers });
    }

    public delete(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}

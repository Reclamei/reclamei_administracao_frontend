import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HeadService {

    private baseUrl = `${environment.apiEndpoint}/ms-company/heads`;

    constructor(private http: HttpClient) { }

    public confirmUser(externalId) {
        return this.http.patch(`${this.baseUrl}/${externalId}/confirm`, null);
    }

}

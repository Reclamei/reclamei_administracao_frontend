import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {HeadModel} from '../models/aplicacao/head.model';

@Injectable({
    providedIn: 'root'
})
export class HeadService {

    private baseUrl = `${environment.apiEndpoint}/ms-company/heads`;

    constructor(private http: HttpClient) { }

    public confirmUser(externalId) {
        return this.http.patch(`${this.baseUrl}/${externalId}/confirm`, null);
    }

    public denyUser(externalId) {
        return this.http.patch(`${this.baseUrl}/${externalId}/deny`, null);
    }

    public getAllHeadsByCompanyId(companyId: number) {
        return this.http.get<HeadModel[]>(`${this.baseUrl}/company/${companyId}`);
    }

    public create(head: HeadModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl, head, { headers });
    }

    public update(head: HeadModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.put(this.baseUrl, head, { headers });
    }

    public delete(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ServiceTypeModel} from '../models/aplicacao/service-type.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceTypesService {

    private baseUrl = `${environment.apiEndpoint}/ms-company/service-types`;

    constructor(private http: HttpClient) { }

    public findAll() {
        return this.http.get<ServiceTypeModel[]>(this.baseUrl);
    }

    public create(serviceType: ServiceTypeModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl, serviceType, { headers });
    }

    public update(serviceType: ServiceTypeModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.put(this.baseUrl, serviceType, { headers });
    }

    delete(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

}

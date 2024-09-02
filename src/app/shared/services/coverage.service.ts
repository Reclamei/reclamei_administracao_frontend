import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CoverageModel} from '../models/aplicacao/coverage.model';

@Injectable({
    providedIn: 'root'
})
export class CoverageService {

    private baseUrl = `${environment.apiEndpoint}/ms-company/coverages`;

    constructor(private http: HttpClient) { }

    public findAll() {
        return this.http.get<CoverageModel[]>(this.baseUrl);
    }

    public create(coverage: CoverageModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl, coverage, { headers });
    }

    public update(coverage: CoverageModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.put(this.baseUrl, coverage, { headers });
    }

    public findById(serviceTypeId: number, companyId: number) {
        return this.http.get(`${this.baseUrl}/${serviceTypeId}/${companyId}`);
    }

    public delete(serviceTypeId: number, companyId: number) {
        return this.http.delete(`${this.baseUrl}/${serviceTypeId}/${companyId}`);
    }

}

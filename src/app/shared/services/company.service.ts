import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/aplicacao/company.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LocationModel} from '../models/aplicacao/location.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private baseUrl = `${environment.apiEndpoint}/ms-company/companies`;

    constructor(private http: HttpClient) {
    }

    public create(company: CompanyModel) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.baseUrl, company, {headers});
    }

    public findInformationByCnpj(cnpj: string) {
        return this.http.get<CompanyModel>(`${this.baseUrl}/cnpj/${cnpj}`);
    }

    public getCompanyByHeadExternalId(externalId: string) {
        return this.http.get<CompanyModel>(`${this.baseUrl}/head/external-id/${externalId}`);
    }

    public findCompaniesPendingApproval() {
        return this.http.get<CompanyModel[]>(`${this.baseUrl}/pending-approval`);
    }

    public update(company: CompanyModel) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put(this.baseUrl, company, {headers});
    }

    public delete(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    public findAll() {
        return this.http.get<LocationModel[]>(this.baseUrl);
    }

}

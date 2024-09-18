import {Injectable} from '@angular/core';
import {ReclamationModel} from '../models/aplicacao/reclamation.model';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CompanyFilter} from '../models/aplicacao/company-filter.model';
import {DashboardModel} from '../models/aplicacao/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamacaoService {

    private baseUrl = `${environment.apiEndpoint}/ms-reclamation/reclamations`;

    constructor(private http: HttpClient) { }

    public findByCompany(filters: CompanyFilter[]) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.post<ReclamationModel[]>(`${this.baseUrl}/company`, filters, { headers });
    }

    public buildDashboard(filters: CompanyFilter[]) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.post<DashboardModel>(`${this.baseUrl}/company/dashboard`, filters, { headers });
    }
}

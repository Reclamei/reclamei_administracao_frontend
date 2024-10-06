import {Injectable} from '@angular/core';
import {ReclamationModel} from '../models/aplicacao/reclamation.model';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CompanyFilter} from '../models/aplicacao/company-filter.model';
import {DashboardModel} from '../models/aplicacao/dashboard.model';
import {ReportsModel} from '../models/aplicacao/reports.model';

@Injectable({
    providedIn: 'root'
})
export class ReclamationService {

    private baseUrl = `${environment.apiEndpoint}/ms-reclamation/reclamations`;

    constructor(private http: HttpClient) {
    }

    public getById(id: number) {
        return this.http.get<ReclamationModel>(`${this.baseUrl}/${id}`);
    }

    public findByCompany(filters: CompanyFilter[]) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<ReclamationModel[]>(`${this.baseUrl}/company`, filters, {headers});
    }

    public buildDashboard(filters) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<DashboardModel>(`${this.baseUrl}/company/dashboard`, filters, {headers});
    }

    public buildReports(filters) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<ReportsModel>(`${this.baseUrl}/company/reports`, filters, {headers});
    }
}

import {Injectable} from '@angular/core';
import {ComplaintModel} from '../models/aplicacao/complaint-model';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CompanyFilter} from '../models/aplicacao/company-filter.model';
import {DashboardModel} from '../models/aplicacao/dashboard.model';
import {ReportsModel} from '../models/aplicacao/reports.model';

@Injectable({
    providedIn: 'root'
})
export class ComplaintService {

    private baseUrl = `${environment.apiEndpoint}/ms-reclamation/reclamations`;

    constructor(private http: HttpClient) {
    }

    public findByCompany(filters: CompanyFilter[]) {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<ComplaintModel[]>(`${this.baseUrl}/company`, filters, {headers});
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

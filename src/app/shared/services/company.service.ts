import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/aplicacao/company.model';
import {HeadModel} from '../models/aplicacao/head.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    private baseUrl = `${environment.apiEndpoint}/ms-company/companies`;

    constructor(private http: HttpClient) { }

    public create(company: CompanyModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.post(this.baseUrl, company, { headers });
    }

    public findInformationByCnpj(cnpj: string) {
        return this.http.get<CompanyModel>(`${this.baseUrl}/cnpj/${cnpj}`);
    }

    public getCompanyByHeadExternalId(externalId: string) {
        return this.http.get<CompanyModel>(`${this.baseUrl}/head/external-id/${externalId}`);
    }

    public update(company: CompanyModel) {
        const headers = new HttpHeaders({  'Content-Type': 'application/json' });
        return this.http.put(this.baseUrl, company, { headers });
    }

    public obterOrgao(): CompanyModel {
        const orgao = new CompanyModel(
            1,
            'Administrador',
            '/assets/images/representative/orgaos/aaa.png',
            '001112220001',
            'Empresa Luz e Força Energiza',
            'fulano@empresa.com',
            'energia.com.br',
            '27999878714',
            '37241410',
            'Empresa que cuida da energia'
        );
        orgao.heads.push(new HeadModel(1, 1, uuidv4(), 'livia@empresa.com', 'Livia', '27996469871', true));
        return orgao;
    }

}

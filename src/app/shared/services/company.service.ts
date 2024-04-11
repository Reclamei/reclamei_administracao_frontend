import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/aplicacao/company.model';
import {HeadModel} from '../models/aplicacao/head.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    private baseUrl = `${environment.apiEndpoint}/ms-company`;

    private orgaosRegistrados: CompanyModel[] = this.inicializarOrgaos();

    constructor(private http: HttpClient) { }

    public getInformationByCnpj(cnpj: string) {
        return this.http.get<CompanyModel>(`${this.baseUrl}/companies/cnpj/${cnpj}`);
    }

    public obterOrgao(): CompanyModel {
        const orgao = new CompanyModel(
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
        orgao.heads.push(new HeadModel(1, 'livia@empresa.com', 'Livia', '27996469871', true));
        return orgao;
    }

    private inicializarOrgaos(): CompanyModel[] {
        return [
            new CompanyModel(
                'Administrador',
                '/assets/images/representative/orgaos/aaa.png',
                '001112220001',
                'Empresa Luz e Força Energiza',
                'fulano@empresa.com',
                'energia.com.br',
                '27999878714',
                '37241410',
                'Empresa que cuida da energia',
                [
                    new HeadModel(1, 'livia@empresa.com', 'Livia', '27996469871', true)
                ]
            )
        ];
    }

}

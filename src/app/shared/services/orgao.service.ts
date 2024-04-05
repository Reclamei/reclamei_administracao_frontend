import {Injectable} from '@angular/core';
import {OrgaoModel} from '../models/aplicacao/orgao.model';
import {ResponsavelModel} from '../models/aplicacao/responsavel.model';

@Injectable({
  providedIn: 'root'
})
export class OrgaoService {
    private orgaosRegistrados: OrgaoModel[] = this.inicializarOrgaos();

    public obterOrgao(): OrgaoModel {
        const orgao = new OrgaoModel(
            'Empresa Luz e Força Energiza',
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
        orgao.responsaveis.push(new ResponsavelModel(1, 'livia@empresa.com', 'Livia', '27996469871', true));
        return orgao;
    }

    private inicializarOrgaos(): OrgaoModel[] {
        return [
            new OrgaoModel(
                'Empresa Luz e Força Energiza',
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
                    new ResponsavelModel(1, 'livia@empresa.com', 'Livia', '27996469871', true)
                ]
            )
        ];
    }

}

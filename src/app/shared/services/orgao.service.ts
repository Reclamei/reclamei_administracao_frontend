import { Injectable } from '@angular/core';
import { OrgaoModel } from '../models/aplicacao/orgao.model';

@Injectable({
  providedIn: 'root'
})
export class OrgaoService {
    private orgaosRegistrados: OrgaoModel[] = this.inicializarOrgaos();

    public obterOrgao(): OrgaoModel {
        return this.orgaosRegistrados[0];
    }

    private inicializarOrgaos(): OrgaoModel[] {
        return [
            new OrgaoModel('Empresa Luz e Força Energiza', 'Administrador', '/assets/images/representative/orgaos/aaa.png'),
            new OrgaoModel('Recrutadora Humanisto', 'Administrador', '/assets/images/representative/orgaos/bbb.png'),
            new OrgaoModel('Banco Modern Itzen', 'Administrador', '/assets/images/representative/orgaos/ccc.png'),
        ]
    }
}

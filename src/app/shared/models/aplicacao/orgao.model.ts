import {ResponsavelModel} from './responsavel.model';

export class OrgaoModel {
    constructor(
        public titulo: string,
        public role: string,
        public localImagem: string,
        public cnpj: string,
        public nome: string,
        public email: string,
        public site: string,
        public telefone: string,
        public telefoneSac: string,
        public descricao: string,
        public responsaveis?: ResponsavelModel[]
    ) {
        this.responsaveis = [];
    }
}

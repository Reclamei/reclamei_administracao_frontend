import { StatusReclamacaoEnum } from "./status-reclamacao.enum";

export class ReclamacaoModel {
    constructor(
        public localImagem: string,
        public tipo: string,
        public subtipo: string,
        public data: Date,
        public descricao: string,
        public localizacao: string,
        public orgaoResponsavelCorreto: boolean,
        public resposta: string,
        public idStatus: number,
        public problemaVeridico: boolean
    ) {}
}

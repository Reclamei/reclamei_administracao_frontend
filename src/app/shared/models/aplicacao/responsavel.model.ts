export class ResponsavelModel {
    constructor(
        public codigo?: number,
        public email?: string,
        public nome?: string,
        public telefone?: string,
        public isAdm?: boolean
    ) {
        isAdm = false;
    }
}

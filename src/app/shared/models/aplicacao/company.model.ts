import {HeadModel} from './head.model';

export class CompanyModel {
    constructor(
        public role?: string,
        public localImage?: string,
        public cnpj?: string,
        public name?: string,
        public email?: string,
        public site?: string,
        public phone?: string,
        public sacPhone?: string,
        public description?: string,
        public heads?: HeadModel[]
    ) {
        this.heads = [];
    }
}

import {HeadModel} from './head.model';

export class CompanyModel {
    constructor(
        public id?: number,
        public role?: string,
        public localImage?: string,
        public cnpj?: string,
        public name?: string,
        public email?: string,
        public secondaryEmail?: string,
        public site?: string,
        public phone?: string,
        public sacPhone?: string,
        public description?: string,
        public createdAt?: Date,
        public heads?: HeadModel[]
    ) {
        this.heads = [];
    }
}
